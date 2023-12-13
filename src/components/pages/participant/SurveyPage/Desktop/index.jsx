import React from 'react';
import { useIntl } from 'react-intl';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { EICAA_URL } from '../../../../../utils/constants';
import { generateColorByText, formatRawText } from '../../../../../utils/helpers';
import { AREA_COLOR_MAP } from '../../../../../utils/color-maps';
import AssessmentTable from '../../../../common/AssessmentTable';
import PageFooter from '../../../../common/PageFooter';
import ProgressBar from '../../../../common/ProgressBar';
import Button from '../../../../common/ui/Buttons/Button';
import arrowBack from '../../../../../assets/icons/arrow-back.svg';
import './index.scss';

const SurveyPageDesktop = (props) => {
  const {
    assessmentQuestions,
    assessmentAnswers,
    currentPageId,
    setCurrentPageId,
    handleNext,
    onValueChange,
    sendSurvey,
    isDryRun,
  } = props;

  const intl = useIntl();

  const tableElement = React.useRef(null);
  const currentGroupId = React.useMemo(
    () =>
      assessmentQuestions.items.find(
        (questionGroup) => questionGroup[0].pageId === currentPageId,
      )[0]?.groupId,
    [assessmentQuestions, currentPageId],
  );
  const currentArea = React.useMemo(
    () =>
      assessmentQuestions.items.find(
        (questionGroup) => questionGroup[0].pageId === currentPageId,
      )[0]?.area,
    [assessmentQuestions, currentPageId],
  );
  const currentCompetence = React.useMemo(
    () =>
      assessmentQuestions.items.find(
        (questionGroup) => questionGroup[0].pageId === currentPageId,
      )[0]?.competence,
    [assessmentQuestions, currentPageId],
  );
  const currentHint = React.useMemo(
    () =>
      assessmentQuestions.items.find(
        (questionGroup) => questionGroup[0].pageId === currentPageId,
      )[0]?.hint,
    [assessmentQuestions, currentPageId],
  );

  const transitionRefs = React.useRef(
    new Array(assessmentQuestions.items.length).fill(null).map(() => React.createRef()),
  );
  const transitionRef = transitionRefs.current[currentPageId - 1];

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
    <div className="survey-page-desktop">
      <div className="survey-page-desktop__header">
        <div
          className="survey-page-desktop__logo-eicaa"
          onClick={() => {
            window.open(EICAA_URL, '_blank');
          }}
        />
        <div className="survey-page-desktop__logo-eu" />
        <div className="survey-page-desktop__progress-container">
          <ProgressBar
            className="survey-page-desktop__progress-bar"
            percentage={calculateProgress()}
          />
          <div
            className="survey-page-desktop__area-title"
            style={{
              background: generateColorByText(AREA_COLOR_MAP, formatRawText(currentArea), {
                alpha: 0.4,
              }),
            }}
          >
            {`${intl.messages.participant?.surveyPage.area}: ${currentArea}`}
          </div>
        </div>
      </div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentPageId}
          nodeRef={transitionRef}
          timeout={500}
          classNames="survey-page-desktop__transition"
        >
          <div ref={transitionRef} className="survey-page-desktop__body">
            <h4 className="survey-page-desktop__title">
              {`${currentGroupId}. `}
              {currentCompetence}
              <span className="survey-page-desktop__title-hint">
                {` (${intl.messages.participant?.surveyPage.hint}: ${currentHint})`}
              </span>
            </h4>
            <AssessmentTable
              className="survey-page-desktop__table"
              tableElement={tableElement}
              questions={assessmentQuestions.items[currentPageId - 1]}
              answerOptions={assessmentQuestions.answers}
              answers={assessmentAnswers.filter((answer) => answer.pageId === currentPageId)}
              onValueChange={onValueChange}
            />
            <div className="survey-page-desktop__button-container">
              <Button
                className="survey-page-desktop__button -white-bordered -back"
                label={intl.messages.participant?.surveyPage.previous}
                icon={arrowBack}
                handleClick={() => setCurrentPageId(currentPageId - 1)}
                disabled={currentPageId <= 1}
              />
              {currentPageId < assessmentQuestions.items.length ? (
                <Button
                  className="survey-page-desktop__button -next"
                  label={intl.messages.participant?.surveyPage.next}
                  handleClick={() => handleNext(currentPageId + 1)}
                  disabled={
                    !isDryRun
                      ? assessmentAnswers
                          .filter((answer) => answer.pageId === currentPageId)
                          .some((answer) => answer.answer === null)
                      : false
                  }
                />
              ) : (
                <Button
                  className="survey-page-desktop__button -next"
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
      <PageFooter />
      <div className="survey-page-desktop__parallelograms" />
    </div>
  );
};

export default SurveyPageDesktop;
