import React from 'react';
import * as classnames from 'classnames';
import Checkbox from '../ui/Checkbox';
import './index.scss';

const AssessmentTableRowInput = props => {
  const {
    className,
    questionId,
    answerOptions,
    value,
    onChange=()=>{},
  } = props;

  return (
    <>
      {answerOptions?.map(option => (
        <td
          key={option.score}
          className={classnames(
            'assessment-table-row-input',
            className && className,
            value === option.score && `-checked -value-${value}`,
          )}
          onClick={(event) => {
            const elem = event.target;
            const input = elem.querySelector('input');
            input?.click();
          }}
        >
          <Checkbox
            className="assessment-table-row-input__checkbox"
            name={`question${questionId}Score${option.score}`}
            value={value === option.score}
            checked={value === option.score}
            onChange={() => onChange(option.score)}
            unclickable={value === option.score}
          />
        </td>
      ))}
    </>
  );
};

export default AssessmentTableRowInput;
