import React, { useMemo } from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';

import MetricsSummary from './MetricsSummary';
import RadarChart from './RadarChart';
import MatrixChart from './MatrixChart';
import StackedBarChart from './StackedBarChart';
import {
  getCompetenceAverages,
  getCompetenceGradeHistogram,
  getProportionalSummary,
} from './utils';
import './index.scss';

const AssessmentsCharts = (props) => {
  const { className, requestedData, requestedDataMetrics } = props;
  const [{ assessmentTypesQuestionsData, selectedAssessmentType }] = React.useContext(AppContext);

  const assessmentTypeQuestionData = useMemo(() => {
    if (assessmentTypesQuestionsData) {
      return assessmentTypesQuestionsData[selectedAssessmentType];
    }
  }, [assessmentTypesQuestionsData, selectedAssessmentType]);

  const count = useMemo(() => (requestedData || []).length, [requestedData]);
  const competenceAverages = useMemo(
    () => getCompetenceAverages(requestedData, count, assessmentTypeQuestionData),
    [requestedData, count, assessmentTypeQuestionData],
  );
  const competenceGradeHistogram = useMemo(
    () => getCompetenceGradeHistogram(requestedData, assessmentTypeQuestionData),
    [requestedData, assessmentTypeQuestionData],
  );
  const proportionalSummary = useMemo(() => getProportionalSummary(requestedData), [requestedData]);

  return (
    <div className={classnames('assessments-charts', className && className)}>
      {count ? (
        <MetricsSummary
          requestedDataMetrics={requestedDataMetrics}
          competenceAverages={competenceAverages}
        />
      ) : null}
      {count ? <RadarChart competenceAverages={competenceAverages} /> : null}
      {count ? (
        <MatrixChart competenceGradeHistogram={competenceGradeHistogram} count={count} />
      ) : null}
      {count ? <StackedBarChart proportionalSummary={proportionalSummary} /> : null}
    </div>
  );
};

export default AssessmentsCharts;
