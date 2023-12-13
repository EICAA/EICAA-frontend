import React, { useMemo } from 'react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import RecommendationGroup from './RecommendationGroup';
import { getCompetenceAverages } from '../../AssessmentsCharts/utils';
import { getGroupedModuleRecommendations } from '../utils';
import './index.scss';

const GroupedRecommendations = ({ className, requestedData }) => {
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
    return getGroupedModuleRecommendations(competenceAverages);
  }, [competenceAverages]);

  return (
    <div className={classnames('grouped-recommendations', className && className)}>
      <div className="grouped-recommendations__header">
        <div className="grouped-recommendations__title">
          {intl.messages.user?.assessmentsPage.recommendedCdkModules.title}
        </div>
        <div className="grouped-recommendations__subtitle">
          {intl.messages.user?.assessmentsPage.recommendedCdkModules.subtitle}
        </div>
      </div>
      <div className="grouped-recommendations__content">
        <RecommendationGroup
          selectedAssessmentType={selectedAssessmentType}
          difficulty={'advanced'}
          recommendations={recommendations}
        />
        <RecommendationGroup
          selectedAssessmentType={selectedAssessmentType}
          difficulty={'intermediate'}
          recommendations={recommendations}
        />
        <RecommendationGroup
          selectedAssessmentType={selectedAssessmentType}
          difficulty={'basic'}
          recommendations={recommendations}
        />
      </div>
    </div>
  );
};

export default GroupedRecommendations;

//

/*

  const recommendations = [
    {
      id: 2,
      name: 'Innov8 now!',
      area: 'Ideas and Opportunities',
      competence: 'Spotting opportunities',
      difficulty: 'intermediate',
    },
    {
      id: 7,
      name: 'Design Dash',
      area: 'Ideas and Opportunities',
      competence: 'Design orientation',
      difficulty: 'advanced',
    },
    {
      id: 18,
      name: 'Analysis of the ethical and sustainability aspects of the new venture.',
      area: 'Ideas and Opportunities',
      competence: 'Ethical and sustainable thinking',
      difficulty: 'intermediate',
    },
    {
      id: 21,
      name: 'Self-awareness module',
      area: 'Resources',
      competence: 'Self-awareness and self-efficacy',
      difficulty: 'intermediate',
    },
    {
      id: 42,
      name: 'Identity Creation Canvas',
      area: 'Into Action',
      competence: 'Planning and management',
      difficulty: 'intermediate',
    },
  ];

  {recommendations.map((recommendation) => (
    <RecommendationCard key={recommendation.id} recommendation={recommendation} />
  ))}

*/
