import React, { useMemo } from 'react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { getCompetenceAverages } from '../../AssessmentsCharts/utils';
import { getSingleListModuleRecommendations, selectDifficulty } from '../utils';
import './index.scss';
import RecommendationCard from '../RecommendationCard';

const SingleListRecommendations = ({ className, requestedData }) => {
  const [{ assessmentTypesQuestionsData, selectedAssessmentType }] = React.useContext(AppContext);

  const intl = useIntl();

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

  const recommendations = useMemo(() => {
    return getSingleListModuleRecommendations(competenceAverages);
  }, [competenceAverages]);

  return (
    <div className={classnames('single-list-recommendations', className && className)}>
      <div className="single-list-recommendations__header">
        <div className="single-list-recommendations__title">
          {intl.messages.user?.assessmentsPage.recommendedCdkModules.title}
        </div>
        <div className="single-list-recommendations__subtitle">
          {intl.messages.user?.assessmentsPage.recommendedCdkModules.subtitle}
        </div>
      </div>
      <div className="single-list-recommendations__content">
        {recommendations
          ? recommendations.map((recommendation, idx) => {
              if (idx >= 5) return null;
              return (
                <RecommendationCard
                  key={idx}
                  selectedAssessmentType={selectedAssessmentType}
                  recommendation={recommendation}
                  difficulty={selectDifficulty(recommendation.avg)}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SingleListRecommendations;
