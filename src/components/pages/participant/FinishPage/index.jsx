import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { PARTICIPANT_ASSESSMENT_KEYS } from '../../../../storage/storageHandlers/config';
import { useIdbStorageAssessment } from '../../../../storage/storageHandlers/hooks';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import FeedbackForm from '../../../forms/participant/FeedbackForm';
import ScreenResolver from '../../../common/ScreenResolver';
import Button from '../../../common/ui/Buttons/Button';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { EICAA_URL, PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import { createResultsWithTablesPdf } from '../../../../utils/pdf/pdf-w-table';
import { postFeedback, deleteResults } from '../../../../api/services/Assessments';
import './index.scss';

const FinishPage = () => {
  const dispatch = React.useContext(AppContext)[1];
  const [isFeedbackSent, setIsFeedbackSent] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  const intl = useIntl();
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];
  const idbStorageAssessment = useIdbStorageAssessment();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);
  const resultToken = searchParams.get(QUERY_PARAM_KEYS.RESULT_TOKEN);

  const downloadResults = async () => {
    const assessmentData = await idbStorageAssessment.get();

    if (!assessmentData) {
      return;
    }

    createResultsWithTablesPdf(assessmentData);
  };

  const sendFeedback = async (values, { setSubmitting }) => {
    const feedbackData = {
      feedbackScore: values.rating,
      feedbackText: values.feedback,
    };

    for (const key of Object.keys(feedbackData)) {
      if (!feedbackData[key]) {
        delete feedbackData[key];
      }
    }

    try {
      loadingLayer.show();
      const response = await postFeedback(assessmentCode, resultToken, feedbackData);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        setIsFeedbackSent(true);
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.feedbackSentTitle,
            message: intl.messages.modals?.feedbackSentMessage,
          },
        });
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }

    setSubmitting(false);
  };

  const initiateDeleteRequest = () => {
    dispatch({
      type: REDUCER_TYPES.SET_PROMPT_MODAL_DATA,
      promptModalData: {
        intlMessages: intl.messages,
        title: intl.messages.modals?.deleteRequestWarningTitle,
        message: intl.messages.modals?.deleteRequestWarningMessage,
        acceptHandler: requestDataDelete,
        cancelHandler: () => {},
      },
    });
  };

  const requestDataDelete = async () => {
    try {
      loadingLayer.show();
      const response = await deleteResults(assessmentCode, resultToken);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        dispatch({
          type: REDUCER_TYPES.SET_MODAL_DATA,
          modalData: {
            intlMessages: intl.messages,
            title: intl.messages.modals?.deleteRequestTitle,
            message: intl.messages.modals?.deleteRequestMessage,
          },
        });
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  };

  const checkPageRequirements = React.useCallback(async () => {
    // Check prerequisites to stay on page - show 404 if it fails
    if (!assessmentCode || !resultToken) {
      navigate(PATHS.pageNotAvailable);
      return false;
    } else {
      const assessmentData = await idbStorageAssessment.get();

      if (!Object.keys(assessmentData)?.length) {
        return;
      }

      const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
      const showResultsBoolean = !!surveyMetadata?.shareResults;
      setShowResults(showResultsBoolean);
    }
  }, [assessmentCode, resultToken, navigate, idbStorageAssessment]);

  React.useEffect(() => {
    checkPageRequirements();
  }, [checkPageRequirements]);

  return (
    <div className="finish-page">
      <div className="finish-page__container">
        <div className="finish-page__header">
          <div
            className="finish-page__logo-eicaa"
            onClick={() => {
              window.open(EICAA_URL, '_blank');
            }}
          />
          <div className="finish-page__logo-eu" />
        </div>
        <div className="finish-page__body">
          <h2 className="finish-page__title">{intl.messages.participant?.finishPage.title}</h2>
          {showResults && (
            <>
              <p className="finish-page__description">
                {intl.messages.participant?.finishPage.description}
              </p>
              <div className="finish-page__button-container -single">
                <Button
                  className="finish-page__button -primary-light"
                  label={intl.messages.participant?.finishPage.downloadResults}
                  handleClick={downloadResults}
                />
              </div>
            </>
          )}
          {isFeedbackSent ? (
            <h3 className="finish-page__feedback-sent-message">
              {intl.messages.participant?.finishPage.feedbackSentMessage}
            </h3>
          ) : (
            <div className="finish-page__form-container">
              <FeedbackForm onSubmit={sendFeedback} isFeedbackSent={isFeedbackSent} />
            </div>
          )}
          <Button
            className="finish-page__button -visit-eicaa -primary-light"
            label={intl.messages.participant?.finishPage.visitEicaa}
            handleClick={() => {
              window.location.href = EICAA_URL;
            }}
          />
          <h4 className="finish-page-form__title">
            {intl.messages.participant?.finishPage.deleteButtonTitle}
          </h4>
          <div className="finish-page__button-container -single -no-margin">
            <Button
              className="finish-page__button -red"
              label={intl.messages.participant?.finishPage.deleteButton}
              handleClick={initiateDeleteRequest}
            />
          </div>
        </div>
        <div className="finish-page__footer">
          <p className="finish-page__footer-button">{intl.messages.common?.faqs}</p>
          <p className="finish-page__footer-button">
            <Link to={`${PATHS.privacyPolicy}`} target="_blank">
              {intl.messages.common?.privacyPolicy}
            </Link>
          </p>
          <ScreenResolver
            large={BREAKPOINTS.md}
            desktop={<div className="finish-page__parallelograms" />}
            mobile={null}
          />
        </div>
        <ScreenResolver
          large={BREAKPOINTS.md}
          desktop={null}
          mobile={<div className="finish-page__parallelograms" />}
        />
      </div>
    </div>
  );
};

export default FinishPage;
