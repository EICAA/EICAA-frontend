import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';

import IconWithTooltip from '../../ui/IconWithTooltip';
import { getStrengthsAndWeaknesses } from '../utils';
import './index.scss';

const MetricsSummaryRow = ({ label, value, className }) => {
  const noValue = typeof value === 'undefined';
  return (
    <div className={classnames('metrics-summary__row', className, noValue ? 'no-value' : '')}>
      <div className="metrics-summary__label">{label}</div>
      {!noValue ? <div className="metrics-summary__value">{value}</div> : null}
    </div>
  );
};

const CompetenceGroup = ({ groupTitle, helpText, competenceList, className }) => {
  return (
    <div className={classnames('metrics-summary__group', className)}>
      <div className="metrics-summary__header">
        <span>{groupTitle}</span>
        <IconWithTooltip text={helpText} />
      </div>
      <div className="metrics-summary__body">
        {competenceList.map((competence, idx) => {
          return <MetricsSummaryRow key={idx} label={competence.competence} />;
        })}
      </div>
    </div>
  );
};

const MetricsSummary = ({ competenceAverages, requestedDataMetrics }) => {
  const intl = useIntl();

  const { strengths, weaknesses } = useMemo(
    () => getStrengthsAndWeaknesses(competenceAverages),
    [competenceAverages],
  );
  const { assessmentCount, resultCount, averageSurveyTime } = requestedDataMetrics;

  return (
    <div className="metrics-summary">
      <div className="metrics-summary__title">
        {intl.messages.user?.assessmentsPage.charts.metrics.title}
      </div>
      <div className="metrics-summary__content">
        <div className="metrics-summary__group">
          <div className="metrics-summary__body">
            <MetricsSummaryRow
              label={intl.messages.user?.assessmentsPage.charts.metrics.averageSurveyTime}
              value={
                (averageSurveyTime / 2).toFixed(0) /* Has to be corrected due to dev React timing */
              }
            />
            <MetricsSummaryRow
              label={`${intl.messages.user?.assessmentsPage.charts.metrics.numberOfParticipants}*`}
              value={resultCount}
            />
            <MetricsSummaryRow
              label={`${intl.messages.user?.assessmentsPage.charts.metrics.numberOfAssessments}*`}
              value={assessmentCount}
            />
            <div className="asterisk">{`*${intl.messages.user?.assessmentsPage.data.redaction}`}</div>
          </div>
        </div>
        <div className="metrics-summary__group">
          <div className="metrics-summary__header">
            {intl.messages.user?.assessmentsPage.charts.metrics.averageScoresByArea}
          </div>
          <div className="metrics-summary__body">
            {competenceAverages.map((area, idx) => {
              return (
                <div key={idx} className="metrics-summary__row">
                  <div className="metrics-summary__label">{area.area}</div>
                  <div className="metrics-summary__value">{area.avg.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="metrics-summary__row">
          <CompetenceGroup
            groupTitle={intl.messages.user?.assessmentsPage.charts.metrics.strengths.title}
            helpText={intl.messages.user?.assessmentsPage.charts.metrics.strengths.help}
            competenceList={strengths}
            className={'strengths-and-weaknesses'}
          />
          <CompetenceGroup
            groupTitle={intl.messages.user?.assessmentsPage.charts.metrics.weaknesses.title}
            helpText={intl.messages.user?.assessmentsPage.charts.metrics.weaknesses.help}
            competenceList={weaknesses}
            className={'strengths-and-weaknesses'}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsSummary;
