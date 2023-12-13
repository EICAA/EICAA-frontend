import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { AppContext } from '../../../../storage/context';
import {
  PARTICIPANT_ASSESSMENTS_LOCAL_KEYS,
  PARTICIPANT_ASSESSMENT_KEYS,
  STORAGE_KEYS,
} from '../../../../storage/storageHandlers/config';
import { getLocalStorageAssessmentData } from '../../../../storage/storageHandlers/utils';
import { useIdbStorageAssessment } from '../../../../storage/storageHandlers/hooks';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import {
  createAssessmentAnswersStructure,
  getCurrentPageId,
  getCurrentQuestionId,
  restructureAssessmentQuestions
} from './helpers';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import {
  useLoadingLayer,
  useShowErrorModal,
  useShowStorageErrorModal
} from '../../../../utils/hooks';
import {
  getAssessmentQuestions,
  postAssessmentAnswers,
} from '../../../../api/services/Assessments';
import ScreenResolver from '../../../common/ScreenResolver';
import DryRunBox from '../../../common/ui/DryRunBox';
import SurveyPageDesktop from './Desktop';
import SurveyPageMobile from './Mobile';
import AssessmentCounter from '../../../common/AssessmentCounter';
import './index.scss';

const SurveyPage = () => {
  const [{ assessmentLanguage }, dispatch] = React.useContext(AppContext);
  const [assessment, setAssessment] = React.useState({});
  const [assessmentQuestions, setAssessmentQuestions] = React.useState();
  const [assessmentAnswers, setAssessmentAnswers] = React.useState();
  const [currentPageId, setCurrentPageId] = React.useState(1);
  const [highestReachedPageId, setHighestReachedPageId] = React.useState(1);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(1);
  const [highestReachedQuestionId, setHighestReachedQuestionId] = React.useState(1);

  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const idbStorageAssessment = useIdbStorageAssessment();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();
  const showStorageErrorModal = useShowStorageErrorModal();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);
  const isDryRun = searchParams.get(QUERY_PARAM_KEYS.DRY_RUN);

  const checkAutoPaginate = answers => {
    // mobile view
    if (
      currentQuestionId === highestReachedQuestionId &&
      answers.find(answer => answer.id === currentQuestionId).answer !== null &&
      currentQuestionId !== answers[answers.length - 1].id
    ) {
      setCurrentQuestionId(currentQuestionId + 1);
      setHighestReachedQuestionId(currentQuestionId + 1);
    }

    // desktop view
    if (
      currentPageId === highestReachedPageId &&
      !answers.filter(answer => answer.pageId === currentPageId).some(answer => answer.answer === null) &&
      currentPageId !== answers[answers.length - 1]?.pageId
    ) {
      setCurrentPageId(currentPageId + 1);
      setHighestReachedPageId(currentPageId + 1);
    }
  };

  const handleNextDesktop = pageId => {
    setCurrentPageId(pageId);
    if (pageId > highestReachedPageId) {
      setHighestReachedPageId(pageId);
    }
  };

  const handleNextMobile = questionId => {
    setCurrentQuestionId(questionId);
    if (questionId > highestReachedQuestionId) {
      setHighestReachedQuestionId(questionId);
    }
  };

  const updateAnswers = async (answerId, value) => {
    if (assessmentAnswers) {
      const updatedAssessmentAnswers = JSON.parse(JSON.stringify(assessmentAnswers));
      const updatedAnswerId = updatedAssessmentAnswers.map((answer) => answer.id).indexOf(answerId);

      if (updatedAnswerId > -1) {
        updatedAssessmentAnswers[updatedAnswerId].answer = value;
        setAssessmentAnswers(updatedAssessmentAnswers);
        checkAutoPaginate(updatedAssessmentAnswers);

        if (!isDryRun) {
          await idbStorageAssessment.setData(
            PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_ANSWERS,
            updatedAssessmentAnswers,
          );
        }
      }
    }
  };

  const sendSurvey = async () => {
    const assessmentData = await idbStorageAssessment.get();

    if (!assessmentData) {
      return;
    }

    setAssessment(assessmentData);

    if (isDryRun) {
      const path = getLocalStorage(STORAGE_KEYS.DRY_RUN_REDIRECT) || `${PATHS.user}/${PATHS.dashboard}`;
      
      navigate(path);
      return;
    }

    try {
      loadingLayer.show();
      const metrics = {
        start: assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_START],
        end: new Date().toISOString(),
        durationSeconds: getLocalStorageAssessmentData(
          assessmentCode,
          PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.DURATION_SECONDS,
        ),
      };

      const response = await postAssessmentAnswers(assessmentCode, {
        answers: assessmentAnswers,
        landingFormData: assessmentData.landingFormData,
        demographicsFormData: assessmentData.demographicsFormData,
        metrics,
        language: assessmentLanguage,
      });
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        await idbStorageAssessment.setData(
          PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_END,
          metrics.end,
        );

        const assessmentData = await idbStorageAssessment.get();
        const shareResults = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA]?.shareResults;

        await idbStorageAssessment.setData(
          PARTICIPANT_ASSESSMENT_KEYS.SURVEY_RESPONSE,
          data.data,
        );

        const queryParams = JSON.parse(JSON.stringify(data.data));
        queryParams.assessment = assessmentCode;
        queryParams.shareResults = shareResults;
        navigate(`${PATHS.finish}?${qs.stringify(queryParams)}`);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  };

  const checkPageRequirements = React.useCallback(async () => {
    const assessmentData = await idbStorageAssessment.get();

    if (!assessmentData) {
      return;
    }

    setAssessment(assessmentData);

    if (isDryRun) {
      return true;
    }

    const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
    const landingFormData = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.LANDING_FORM_DATA];
    const demographicsFormData = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.DEMOGRAPHICS_FORM_DATA];
    const surveyResponse = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_RESPONSE];

    // Check prerequisites to stay on page - show 404 if it fails
    if (!assessmentCode) {
      navigate(PATHS.pageNotAvailable);
      return false;
    }

    if (
      !surveyMetadata ||
      !landingFormData ||
      !landingFormData?.consentGiven ||
      (surveyMetadata?.emailRequired && !landingFormData?.email)
    ) {
      navigate(`${PATHS.start}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`);
      return false;
    }

    if (surveyMetadata?.demographics && !demographicsFormData) {
      navigate(`${PATHS.demographics}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`);
      return false;
    }

    if (surveyResponse) {
      const queryParams = JSON.parse(JSON.stringify(surveyResponse));
      queryParams.assessment = assessmentCode;
      navigate(`${PATHS.finish}?${qs.stringify(queryParams)}`);
      return false;
    }

    return assessmentData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentCode, navigate, dispatch]);

  React.useEffect(() => {
    const fetchAssessmentQuestions = async () => {
      const assessmentAnswers = assessment[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_ANSWERS];
      const assessmentData = await idbStorageAssessment.get();
  
      if (!assessmentData) {
        return;
      }

      const assessmentType = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA]?.assessmentType;
      const assessmentLanguage = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SELECTED_LANGUAGE];

      try {
        loadingLayer.show();
        
        const response = await getAssessmentQuestions(assessmentType, assessmentLanguage);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data) {

          if (!isDryRun) {
            await idbStorageAssessment.setData(
              PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_QUESTIONS,
              data.data,
            );
          }
          setAssessmentQuestions(data.data);

          if (!assessmentAnswers?.length || isDryRun) {
            setAssessmentAnswers(createAssessmentAnswersStructure(data.data?.items));
          } else {
            setAssessmentAnswers(assessmentAnswers);

            // Set initial desktop page
            const pageId = getCurrentPageId(assessmentAnswers);
            setCurrentPageId(pageId);
            setHighestReachedPageId(pageId);

            // Set initial mobile page
            const questionId = getCurrentQuestionId(assessmentAnswers);
            setCurrentQuestionId(questionId);
            setHighestReachedQuestionId(questionId);
          }
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    };

    if (
      assessment !== null &&
      assessment !== undefined &&
      !assessmentQuestions
    ) {
      fetchAssessmentQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment, assessmentQuestions, loadingLayer, showErrorModal]);

  React.useEffect(() => {
    checkPageRequirements()
      .then((assessmentData) => {
        if (!assessmentData) {
          return;
        }

        if (!assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_START]) {
          const date = new Date().toISOString();

          return idbStorageAssessment.setData(
            PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_START,
            date,
          );
        }
      })
      .catch((err) => {
        showStorageErrorModal(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentLanguage, showStorageErrorModal]);

  return (
    <div className="survey-page">
      <div className="survey-page__container">
        {assessmentQuestions && (
          <ScreenResolver
            large={BREAKPOINTS.md}
            desktop={
              <SurveyPageDesktop
                assessmentQuestions={restructureAssessmentQuestions(assessmentQuestions)}
                assessmentAnswers={assessmentAnswers}
                currentPageId={currentPageId}
                setCurrentPageId={setCurrentPageId}
                handleNext={handleNextDesktop}
                onValueChange={updateAnswers}
                sendSurvey={sendSurvey}
                isDryRun={isDryRun}
              />
            }
            mobile={
              <SurveyPageMobile
                assessmentQuestions={assessmentQuestions}
                assessmentAnswers={assessmentAnswers}
                currentQuestionId={currentQuestionId}
                setCurrentQuestionId={setCurrentQuestionId}
                handleNext={handleNextMobile}
                onValueChange={updateAnswers}
                sendSurvey={sendSurvey}
                isDryRun={isDryRun}
              />
            }
          />
        )}
      </div>
      <AssessmentCounter isDryRun={isDryRun} />
      <DryRunBox show={isDryRun} />
    </div>
  );
};

export default SurveyPage;
