import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import AssessmentTableRowInput from '../AssessmentTableRowInput';
import './index.scss';

const AssessmentTable = (props) => {
  const {
    className,
    tableElement,
    questions,
    answerOptions,
    answers,
    onValueChange = () => {},
  } = props;

  const intl = useIntl();

  const answerOptionsUsed = React.useMemo(
    () => answerOptions.filter((option) => option.score > 0),
    [answerOptions],
  );

  return (
    <table className={classnames('assessment-table', className && className)} ref={tableElement}>
      <tbody className="assessment-table__body">
        <tr className="assessment-table__row -header">
          <td className="assessment-table__cell-header">
            {intl.messages.participant?.surveyPage.ableTo}
          </td>
          {answerOptionsUsed.map((option) => (
            <td
              key={option.score}
              className={classnames('assessment-table__cell-header', '-answer')}
            >
              {option.title && option.score !== 0 && (
                <h4
                  className={classnames(
                    'assessment-table__cell-header-title',
                    `-score-${option.score}`,
                  )}
                >
                  {option.title}
                </h4>
              )}
              <div className="assessment-table__cell-header-description">{option.description}</div>
            </td>
          ))}
        </tr>
        {questions.map((question, i) => (
          <tr key={question.id} className="assessment-table__row -body">
            <td className="assessment-table__cell-body">{question.question}</td>
            <AssessmentTableRowInput
              key={question.id}
              questionId={question.id}
              className="assessment-table__cell-body"
              answerOptions={answerOptionsUsed}
              value={answers[i].answer}
              onChange={(value) => onValueChange(answers[i].id, value)}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssessmentTable;
