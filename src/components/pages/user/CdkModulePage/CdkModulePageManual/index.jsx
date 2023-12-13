import React from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../../storage/context';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageManual = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const intl = useIntl();

  const { instructorManual } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  return (
    <div className="cdk-module-page-manual">
      <CdkCard
        className="cdk-module-page-manual__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={intl.messages.user?.cdkModulePage.module.instructorManual}
        description={formatRawText(instructorManual)}
      />
    </div>
  );
};

export default CdkModulePageManual;
