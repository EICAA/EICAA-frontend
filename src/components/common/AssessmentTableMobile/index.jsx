import React from 'react';
import * as classnames from 'classnames';
import AssessmentTableMobileCard from '../AssessmentTableMobileCard';
import './index.scss';

const AssessmentTableMobile = (props) => {
  const { className, answerOptions, answer, onValueChange } = props;

  const answerOptionsUsed = React.useMemo(
    () => answerOptions.filter((option) => option.score > 0),
    [answerOptions],
  );

  return (
    <div className={classnames('assessment-table-mobile', className && className)}>
      {answerOptionsUsed.map((option) => (
        <AssessmentTableMobileCard
          key={option.score}
          className="assessment-table-mobile__card"
          score={option.score}
          title={option.title}
          description={option.description}
          selected={option.score === answer?.answer}
          onClick={onValueChange}
        />
      ))}
    </div>
  );
};

export default AssessmentTableMobile;
