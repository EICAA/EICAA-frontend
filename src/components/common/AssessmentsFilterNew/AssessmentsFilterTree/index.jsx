import React, { useMemo } from 'react';
import AssessmentsFilterAssessment from '../AssessmentsFilterAssessment';
import './index.scss';

const AssessmentsFilterTree = (props) => {
  const {
    assessmentsResults,
    assessments,
    results,
    dispatchAssessmentsResults,
    dispatchAssessments,
    dispatchResults,
    demographicsFieldLabels,
    demographicsValuesLabels,
  } = props;

  const assessmentIds = useMemo(() => {
    return Object.keys(assessmentsResults || {});
  }, [assessmentsResults]);

  return (
    <div className="assessments-filter-tree">
      {assessmentIds.map((id) => {
        const { assessmentType, name, assessmentResults } = assessmentsResults[id];

        return (
          <AssessmentsFilterAssessment
            key={id}
            id={id}
            name={name}
            assessmentType={assessmentType}
            assessmentResults={assessmentResults}
            assessments={assessments}
            results={results}
            dispatchAssessmentsResults={dispatchAssessmentsResults}
            dispatchAssessments={dispatchAssessments}
            dispatchResults={dispatchResults}
            demographicsFieldLabels={demographicsFieldLabels}
            demographicsValuesLabels={demographicsValuesLabels}
          />
        );
      })}
    </div>
  );
};

export default AssessmentsFilterTree;
