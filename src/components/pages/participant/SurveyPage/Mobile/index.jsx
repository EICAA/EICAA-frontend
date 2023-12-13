import React from 'react';
import { useIntl } from 'react-intl';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import AssessmentTableMobile from '../../../../common/AssessmentTableMobile';
import { EICAA_URL } from '../../../../../utils/constants';
import { generateColorByText, formatRawText } from '../../../../../utils/helpers';
import { AREA_COLOR_MAP } from '../../../../../utils/color-maps';
import ProgressBar from '../../../../common/ProgressBar';
import Button from '../../../../common/ui/Buttons/Button';
import './index.scss';

const SurveyPageMobile = (props) => {
  const {
    assessmentQuestions,
    assessmentAnswers,
    currentQuestionId,
    setCurrentQuestionId,
    handleNext,
    onValueChange,
    sendSurvey,
    isDryRun,
  } = props;

  const intl = useIntl();

  const currentGroupId = React.useMemo(
    () => assessmentAnswers.find((answer) => answer.id === currentQuestionId)?.groupId,
    [assessmentAnswers, currentQuestionId],
  );
  const currentQuestion = React.useMemo(
    () => assessmentQuestions.items.find((question) => question.id === currentQuestionId),
    [assessmentQuestions, currentQuestionId],
  );

  const transitionMobileRefs = React.useRef(
    new Array(assessmentQuestions.items.length).fill(null).map(() => React.createRef()),
  );
  const transitionMobileRef = transitionMobileRefs.current[currentQuestionId - 1];

  const calculateProgress = () => {
    if (assessmentAnswers.filter((answer) => answer.answer !== null).length === 0) {
      return 0;
    }

    return Math.ceil(
      (assessmentAnswers.filter((answer) => answer.answer !== null).length /
        assessmentAnswers.length) *
        100,
    );
  };

  return (
    <div className="survey-page-mobile">
      <div className="survey-page-mobile__header">
        <div
          className="survey-page-mobile__logo-eicaa"
          onClick={() => {
            window.open(EICAA_URL, '_blank');
          }}
        />
        <div className="survey-page-mobile__logo-eu" />
      </div>
      <div className="survey-page-mobile__content">
        <div className="survey-page-mobile__area-title-container">
          <div
            className="survey-page-mobile__area-title"
            style={{
              background: generateColorByText(AREA_COLOR_MAP, formatRawText(currentQuestion?.area), {
                alpha: 0.4,
              }),
            }}
          >
            {`${intl.messages.participant?.surveyPage.area}: ${currentQuestion?.area}`}
          </div>
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentQuestionId}
            nodeRef={transitionMobileRef}
            timeout={500}
            classNames="survey-page-mobile__transition"
          >
            <div ref={transitionMobileRef} className="survey-page-mobile__transition-container">
              <h4 className="survey-page-mobile__title">
                {`${currentGroupId}. `}
                {currentQuestion?.competence}
                <span className="survey-page-mobile__title-hint">
                  {` (${intl.messages.participant?.surveyPage.hint}: ${currentQuestion?.hint})`}
                </span>
              </h4>
              <h3 className="survey-page-mobile__question">{currentQuestion?.question}</h3>
              <h3 className="survey-page-mobile__pre-question">
                {intl.messages.participant?.surveyPage.ableTo}
              </h3>
              <AssessmentTableMobile
                className="survey-page-mobile__table"
                answerOptions={assessmentQuestions.answers}
                answer={assessmentAnswers.find((answer) => answer.id === currentQuestionId)}
                onValueChange={(value) => onValueChange(currentQuestionId, value)}
              />
              <div className="survey-page-mobile__button-container">
                <Button
                  className="survey-page-mobile__button -white-bordered"
                  label={intl.messages.participant?.surveyPage.previous}
                  handleClick={() => setCurrentQuestionId(currentQuestionId - 1)}
                  disabled={currentQuestionId <= 1}
                />
                {currentQuestionId < assessmentQuestions.items.length ? (
                  <Button
                    className="survey-page-mobile__button"
                    label={intl.messages.participant?.surveyPage.next}
                    handleClick={() => handleNext(currentQuestionId + 1)}
                    disabled={
                      !isDryRun
                        ? assessmentAnswers.find((answer) => answer.id === currentQuestionId)
                            ?.answer === null
                        : false
                    }
                  />
                ) : (
                  <Button
                    className="survey-page-mobile__button"
                    label={intl.messages.participant?.surveyPage.finish}
                    handleClick={sendSurvey}
                    disabled={
                      !isDryRun ? assessmentAnswers.some((answer) => answer.answer === null) : false
                    }
                  />
                )}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <ProgressBar
          className="survey-page-mobile__progress-bar"
          percentage={calculateProgress()}
        />
        <div className="survey-page-mobile__parallelograms" />
      </div>
    </div>
  );
};

export default SurveyPageMobile;
