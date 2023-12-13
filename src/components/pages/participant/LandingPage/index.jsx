import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import ScreenResolver from '../../../common/ScreenResolver';
import { getAssessment } from '../../../../api/services/Assessments';
import { PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import { PARTICIPANT_ASSESSMENT_KEYS } from '../../../../storage/storageHandlers/config';
import { useIdbStorageAssessment } from '../../../../storage/storageHandlers/hooks';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import AssessmentLanguageSelector from '../../../common/AssessmentLanguageSelector';
import LandingPageDesktop from './Desktop';
import LandingPageMobile from './Mobile';
import DryRunBox from '../../../common/ui/DryRunBox';
import './index.scss';

const LandingPage = () => {
  const dispatch = React.useContext(AppContext)[1];
  const setAssessment = React.useState({})[1];
  const [assessmentData, setAssessmentData] = React.useState({});
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);

  const navigate = useNavigate();
  const intl = useIntl();
  const searchParams = useSearchParams()[0];
  const idbStorageAssessment = useIdbStorageAssessment();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);
  const isDryRun = searchParams.get(QUERY_PARAM_KEYS.DRY_RUN);
  const emailRequired = assessmentData?.emailRequired || false;
  const demographics = assessmentData?.demographics || false;

  const startAssessment = async (values, { setSubmitting }) => {
    const landingData = {
      email: values.email,
      consentGiven: values.consentGiven,
    };

    if (!emailRequired) {
      delete landingData.email;
    }

    if (!isDryRun) {
      await idbStorageAssessment.setData(
        PARTICIPANT_ASSESSMENT_KEYS.LANDING_FORM_DATA,
        landingData,
      );
    }

    const demographicsPart = demographics ? PATHS.demographics : PATHS.assessment;
    const assessmentPart = `${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`;
    const dryRunPart = isDryRun ? `&${QUERY_PARAM_KEYS.DRY_RUN}=true` : '';
    const path = `${demographicsPart}?${assessmentPart}${dryRunPart}`;

    navigate(path);
    setSubmitting(false);
  };

  const handleLanguageSelect = async (lang) => {
    await idbStorageAssessment.setData(PARTICIPANT_ASSESSMENT_KEYS.SELECTED_LANGUAGE, lang);

    dispatch({
      type: REDUCER_TYPES.SET_SELECTED_PARTICIPANT_LANGUAGE,
      selectedParticipantLanguage: lang,
    });
    dispatch({
      type: REDUCER_TYPES.SET_ASSESSMENT_LANGUAGE,
      assessmentLanguage: lang,
    });
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

    // Check prerequisites to stay on page - show 404 if it fails
    if (!assessmentCode) {
      navigate(PATHS.pageNotAvailable);
      return false;
    }

    if (assessmentData === null || assessmentData === undefined) {
      return true;
    }

    const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
    const landingFormData = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.LANDING_FORM_DATA];

    if (
      assessmentCode &&
      surveyMetadata &&
      landingFormData &&
      landingFormData?.consentGiven &&
      surveyMetadata?.emailRequired &&
      landingFormData?.email
    ) {
      navigate(
        surveyMetadata?.demographics
          ? `${PATHS.demographics}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`
          : `${PATHS.assessment}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}`,
      );
      return false;
    }

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentCode, navigate]);

  React.useEffect(() => {
    const fetchAssessment = async () => {
      try {
        loadingLayer.show();
        const response = await getAssessment(assessmentCode);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data) {
          setAssessmentData(data.data);

          await idbStorageAssessment.setData(
            PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA,
            data.data,
          );
        }
        if (Object.keys(await idbStorageAssessment.get()).length === 0) {
          dispatch({
            type: REDUCER_TYPES.SET_ERROR_MODAL,
            errorModal: {
              intlMessages: intl.messages,
              message: intl.messages.apiErrors?.incognitoBrowser,
            },
          });    
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    };

    const selectLanguage = async () => {
      try {
        const assessmentData = await idbStorageAssessment.get();

        if (!assessmentData) {
          return;
        }

        const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
        const availableLanguages = surveyMetadata.availableLanguages;

        if (availableLanguages.length === 1) {
          handleLanguageSelect(availableLanguages[0]);
        } else {
          dispatch({
            type: REDUCER_TYPES.SET_MODAL_DATA,
            modalData: {
              intlMessages: intl.messages,
              title: intl.messages.modals?.languageSelectTitle,
              component: (
                <AssessmentLanguageSelector
                  availableLanguages={availableLanguages}
                  onLanguageSelected={handleLanguageSelect}
                  intlMessages={intl.messages}
                />
              ),
              hideButtons: true,
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    const initPage = async () => {
      const allowPageUse = await checkPageRequirements();
      if (!allowPageUse) {
        return;
      }
      await fetchAssessment();
      await selectLanguage();
    };

    if (intl.messages && Object.keys(intl.messages).length && !isPageLoaded) {
      initPage();
      setIsPageLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl.messages, loadingLayer]);

  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <ScreenResolver
          large={BREAKPOINTS.md}
          desktop={
            <LandingPageDesktop startAssessment={startAssessment} assessmentData={assessmentData} />
          }
          mobile={
            <LandingPageMobile startAssessment={startAssessment} assessmentData={assessmentData} />
          }
        />
      </div>
      <DryRunBox show={isDryRun} />
    </div>
  );
};

export default LandingPage;
