import React from 'react';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { CDK_TYPES, PATHS } from '../../../utils/constants';
import CdkTypeCard from '../CdkTypeCard';
import education from '../../../assets/images/education-cdk.svg';
import business from '../../../assets/images/business-cdk.svg';
import './index.scss';

const CdkTypeSelector = (props) => {
  const { className } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={classnames('cdk-type-selector', className && className)}>
      <div className="cdk-type-selector__card-container">
        <CdkTypeCard
          className="cdk-type-selector__card"
          title={intl.messages.common?.higherEducation}
          imageUrl={education}
          topColor="green"
          handleSelect={() =>
            navigate(
              `${PATHS.user}${PATHS.cdkRepository}/${PATHS.CDK_REPOSITORY.list}/${CDK_TYPES.STUDENT}`,
            )
          }
        />
        <CdkTypeCard
          className="cdk-type-selector__card"
          title={intl.messages.common?.business}
          imageUrl={business}
          topColor="turquoise-lighter"
          handleSelect={() =>
            navigate(
              `${PATHS.user}${PATHS.cdkRepository}/${PATHS.CDK_REPOSITORY.list}/${CDK_TYPES.EMPLOYEE}`,
            )
          }
        />
      </div>
    </div>
  );
};

export default CdkTypeSelector;
