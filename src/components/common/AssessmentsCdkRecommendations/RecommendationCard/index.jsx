import React, { useCallback, useMemo } from 'react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';

import lightBulb from '../../../../assets/icons/light-bulb.svg';
import { AREA_COLOR_MAP, DIFFICULTY_COLOR_MAP } from '../../../../utils/color-maps';
import { CDK_DATA, PATHS } from '../../../../utils/constants';
import { generateColorByText } from '../../../../utils/helpers';
import { getModuleIdInfo } from '../../../pages/user/CdkModulePage/helpers';
import ButtonRectangular from '../../ui/Buttons/ButtonRectangular';
import './index.scss';

const AREAS = ['Ideas and Opportunities ', 'Resources', 'Into Action'];

const getModuleMap = (json) => {
  const { cdkModules } = json;

  const map = {};

  for (let cdkModule of cdkModules) {
    const { competenceID } = cdkModule;

    const [areaId, competenceId, difficulty] = getModuleIdInfo(competenceID);

    if (!map[areaId]) {
      map[areaId] = {};
    }
    if (!map[areaId][competenceId]) {
      map[areaId][competenceId] = {};
    }
    map[areaId][competenceId][difficulty] = cdkModule;
  }

  return map;
};

const employeeModuleMap = getModuleMap(CDK_DATA.EMPLOYEE);
const studentModuleMap = getModuleMap(CDK_DATA.STUDENT);

const RecommendationCard = (props) => {
  const { className, selectedAssessmentType, recommendation, difficulty /*recommendation*/ } =
    props;

  const intl = useIntl();

  const recommendedModule = useMemo(() => {
    const { area, competence } = recommendation;

    const map = selectedAssessmentType === 'student' ? studentModuleMap : employeeModuleMap;

    const module = map[area][competence][difficulty];

    return {
      title: (module.moduleName || '').trim(),
      area: (AREAS[area - 1] || '').trim(),
      competence: (module.competence || '').trim(),
      difficulty,
      id: module.id,
    };
  }, [selectedAssessmentType, recommendation, difficulty]);

  const openCdkModule = useCallback(() => {
    const path =
      // `${PATHS.user}${PATHS.cdkModules}/${recommendation.type}/${id}/${PATHS.CDK_MODULES.overview}`
      `${PATHS.user}${PATHS.cdkModules}/${selectedAssessmentType}/${recommendedModule.id}/${PATHS.CDK_MODULES.overview}`;
    window.open(path, '_blank');
  }, [selectedAssessmentType, recommendedModule]);

  const areaStyle = useMemo(() => {
    return {
      backgroundColor: generateColorByText(AREA_COLOR_MAP, recommendedModule.area, {
        alpha: 0.2,
      }),
    };
  }, [recommendedModule]);

  return (
    <div className={classnames('recommendation-card', className && className)}>
      <div className="recommendation-card__title">
        {recommendedModule.title}
        <p
          className="recommendation-card__difficulty"
          style={{
            backgroundColor: generateColorByText(DIFFICULTY_COLOR_MAP, difficulty, {
              alpha: 0.4,
            }),
          }}
        >
          {difficulty}
        </p>
      </div>
      <div className="recommendation-card__container">
        <div className="recommendation-card__content">
          <p className="recommendation-card__content-area">
            <mark style={areaStyle}>Area: {recommendedModule.area}</mark>
          </p>
          <p>
            <mark style={areaStyle}>Competence: {recommendedModule.competence}</mark>
          </p>
        </div>
        <ButtonRectangular
          className="recommendation-card__button"
          iconUrl={lightBulb}
          // iconHeight={17}
          tooltipText={intl.messages.user?.assessmentsPage.recommendedCdkModules.viewModule}
          handleClick={openCdkModule}
        />
      </div>
    </div>
  );
};

export default RecommendationCard;
