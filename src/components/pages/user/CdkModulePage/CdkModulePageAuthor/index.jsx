import React from 'react';
import { useIntl } from 'react-intl';
import { BORDER_RADIUS_TYPES, LAYOUTS } from '../../../../../utils/constants';
import { formatRawText } from '../../../../../utils/helpers';
import { generateDetailsHtml } from '../helpers';
import { AppContext } from '../../../../../storage/context';
import CdkCard from '../../../../common/CdkCard';
import './index.scss';

const CdkModulePageAuthor = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const intl = useIntl();

  const { author, institution, countryOfTheIssuer, dateOfIssuing } = cdkModule?.moduleData || {};
  // `${API_BASE_URL}/images/${cdkRepositoryType}-${cdkId}/image.webp`;

  const authorDetails = React.useMemo(() => {
    const details = {};
    details[intl.messages.user?.cdkModulePage.module.name] = author;
    details[intl.messages.user?.cdkModulePage.module.institution] = institution;
    details[intl.messages.user?.cdkModulePage.module.countryOfTheIssuer] = countryOfTheIssuer;
    details[intl.messages.user?.cdkModulePage.module.dateOfIssuing] = dateOfIssuing;

    return details;
  }, [intl.messages, author, institution, countryOfTheIssuer, dateOfIssuing]);

  return (
    <div className="cdk-module-page-author">
      <CdkCard
        className="cdk-module-page-author__card"
        layout={LAYOUTS.ROW}
        style={{ gridArea: 'a' }}
        borderRadiusType={BORDER_RADIUS_TYPES.TOP}
        title={intl.messages.user?.cdkModulePage.module.author}
        description={formatRawText(generateDetailsHtml(authorDetails))}
        descriptionIsHtml
      />
    </div>
  );
};

export default CdkModulePageAuthor;
