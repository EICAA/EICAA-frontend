import React, { useEffect, useState } from 'react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';
import RecommendationCard from '../../RecommendationCard';
import './index.scss';

/* const RecommendationGroupOld = ({
  selectedAssessmentType,
  recommendations,
  difficulty,
  maxCount,
}) => {
  return recommendations[difficulty].map((recommendation, idx) => {
    if (typeof maxCount !== 'undefined' && idx >= maxCount) {
      return null;
    }

    return (
      <RecommendationCard
        key={idx}
        selectedAssessmentType={selectedAssessmentType}
        recommendation={recommendation}
        difficulty={difficulty}
      />
    );
  });
}; */

const RecommendationGroup = ({ selectedAssessmentType, recommendations, difficulty }) => {
  const intl = useIntl();
  const length = recommendations[difficulty].length;
  const empty = !length;
  const [showIdx, setShowIdx] = useState(0);

  useEffect(() => {
    setShowIdx(0);
  }, [recommendations]);

  const prevEnabled = showIdx > 0;
  const nextEnabled = showIdx + 1 < length;

  return (
    <div className={classnames('recommendation-group', empty ? 'empty' : '')}>
      {recommendations[difficulty].map((recommendation, idx) => {
        if (idx !== showIdx) {
          return null;
        }

        return (
          <RecommendationCard
            key={idx}
            selectedAssessmentType={selectedAssessmentType}
            recommendation={recommendation}
            difficulty={difficulty}
          />
        );
      })}
      {prevEnabled || nextEnabled ? (
        <div className="recommendation-group__controls">
          <div
            className={classnames('recommendation-group__link', prevEnabled ? '' : 'disabled')}
            onClick={prevEnabled ? () => setShowIdx(showIdx - 1) : undefined}
          >
            <span>{intl.messages.user?.assessmentsPage.recommendedCdkModules.previous}</span>
          </div>
          <div
            className={classnames('recommendation-group__link', nextEnabled ? '' : 'disabled')}
            onClick={nextEnabled ? () => setShowIdx(showIdx + 1) : undefined}
          >
            <span>{intl.messages.user?.assessmentsPage.recommendedCdkModules.next}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RecommendationGroup;
