import React from 'react';
import { useIntl } from 'react-intl';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import { AppContext } from '../../../../../storage/context';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageScope = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const intl = useIntl();

  const { format, workload } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  return (
    <div className="cdk-module-page-scope">
      <CdkCard
        className="cdk-module-page-scope__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={intl.messages.user?.cdkModulePage.module.format}
        description={formatRawText(format)}
      />
      <CdkCard
        className="cdk-module-page-scope__card"
        style={{ gridArea: 'b' }}
        borderRadiusType={BORDER_RADIUS_TYPES.RIGHT}
        title={intl.messages.user?.cdkModulePage.module.workload}
        description={formatRawText(workload)}
      />
    </div>
  );
};

export default CdkModulePageScope;
