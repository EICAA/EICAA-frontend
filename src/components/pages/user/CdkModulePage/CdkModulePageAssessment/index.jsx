import React from 'react';
import { useIntl } from 'react-intl';
import { BREAKPOINTS } from '../../../../../utils/breakpoints';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import { useResolveScreen } from '../../../../../utils/hooks';
import { AppContext } from '../../../../../storage/context';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageAssessment = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const intl = useIntl();
  const { isMobile } = useResolveScreen(BREAKPOINTS.xl);

  const minorCardLayout = React.useMemo(() => {
    return isMobile ? LAYOUTS.ROW : LAYOUTS.COLUMN;
  }, [isMobile]);

  const { assessment, supervisionOfAssessment, qualityAssurance } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  return (
    <div className="cdk-module-page-assessment">
      <CdkCard
        className="cdk-module-page-assessment__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={intl.messages.user?.cdkModulePage.module.supervision}
        description={formatRawText(supervisionOfAssessment)}
      />
      <CdkCard
        className="cdk-module-page-assessment__card"
        layout={minorCardLayout}
        style={{ gridArea: 'b' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.assessment}
        description={formatRawText(assessment)}
      />
      <CdkCard
        className="cdk-module-page-assessment__card"
        layout={minorCardLayout}
        style={{ gridArea: 'c' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.qualityAssurance}
        description={formatRawText(qualityAssurance)}
      />
    </div>
  );
};

export default CdkModulePageAssessment;
