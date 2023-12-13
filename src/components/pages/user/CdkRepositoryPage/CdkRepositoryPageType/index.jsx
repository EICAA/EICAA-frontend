import React from 'react';
import { useIntl } from 'react-intl';
import CdkRepositoryHelp from '../../../../common/CdkRepositoryHelp';
import CdkTypeSelector from '../../../../common/CdkTypeSelector';
import './index.scss';

const CdkRepositoryPageType = () => {
  const intl = useIntl();

  return (
    <div className="cdk-repository-page-type">
      <CdkRepositoryHelp className='cdk-repository-page-type__help' />
      <div className="cdk-repository-page-type__content">
        <h2 className="cdk-repository-page-type__subtitle">
          {intl.messages.user?.cdkRepositoryPage.type.subTitle}
        </h2>
        <p className="cdk-repository-page-type__description">
          {intl.messages.user?.cdkRepositoryPage.type.description}
        </p>
        <CdkTypeSelector className='cdk-repository-page-type__selector' />
      </div>
    </div>
  );
};

export default CdkRepositoryPageType;
