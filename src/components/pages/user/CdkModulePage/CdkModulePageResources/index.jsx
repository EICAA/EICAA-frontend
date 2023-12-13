import React from 'react';
import { useIntl } from 'react-intl';
import { BREAKPOINTS } from '../../../../../utils/breakpoints';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import { useResolveScreen } from '../../../../../utils/hooks';
import { AppContext } from '../../../../../storage/context';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageResources = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const intl = useIntl();
  const { isMobile } = useResolveScreen(BREAKPOINTS.xl);

  const minorCardLayout = React.useMemo(() => {
    return isMobile ? LAYOUTS.ROW : LAYOUTS.COLUMN;
  }, [isMobile]);

  const {
    resourcesEducatorsAndBusinessTrainers: resourcesForUsers,
    resourcesForParticipants,
    externalOrAdditionalMaterial,
  } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  return (
    <div className="cdk-module-page-resources">
      <CdkCard
        className="cdk-module-page-resources__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={intl.messages.user?.cdkModulePage.module.forUsers}
        description={formatRawText(resourcesForUsers)}
      />
      <CdkCard
        className="cdk-module-page-resources__card"
        layout={minorCardLayout}
        style={{ gridArea: 'b' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.forParticipants}
        description={formatRawText(resourcesForParticipants)}
      />
      <CdkCard
        className="cdk-module-page-resources__card"
        layout={minorCardLayout}
        style={{ gridArea: 'c' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.externalMaterial}
        description={formatRawText(externalOrAdditionalMaterial)}
      />
    </div>
  );
};

export default CdkModulePageResources;
