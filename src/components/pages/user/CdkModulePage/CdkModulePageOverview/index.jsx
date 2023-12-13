import React from 'react';
// import { useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../../storage/context';
import { BREAKPOINTS } from '../../../../../utils/breakpoints';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import { useResolveScreen } from '../../../../../utils/hooks';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageOverview = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  // const { cdkRepositoryType, cdkId } = useParams();
  const intl = useIntl();
  const { isMobile } = useResolveScreen(BREAKPOINTS.xl);

  const minorCardLayout = React.useMemo(() => {
    return isMobile ? LAYOUTS.ROW : LAYOUTS.COLUMN;
  }, [isMobile]);

  const {
    moduleName,
    moduleDescription,
    learningOutcomes,
    additionalCompetenceList,
    workload,
    assessment,
    format,
  } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  return (
    <div className="cdk-module-page-overview">
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={moduleName}
        description={formatRawText(moduleDescription)}
        important
      />
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={minorCardLayout}
        style={{ gridArea: 'b' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.learningOutcomes}
        description={formatRawText(learningOutcomes)}
      />
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={minorCardLayout}
        style={{ gridArea: 'c' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.otherCompetences}
        description={formatRawText(additionalCompetenceList)}
      />
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={minorCardLayout}
        style={{ gridArea: 'd' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.workload}
        description={formatRawText(workload)}
      />
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={minorCardLayout}
        style={{ gridArea: 'e' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.assessment}
        description={formatRawText(assessment)}
      />
      <CdkCard
        className="cdk-module-page-overview__card"
        layout={minorCardLayout}
        style={{ gridArea: 'f' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.format}
        description={formatRawText(format)}
      />
    </div>
  );
};

export default CdkModulePageOverview;
