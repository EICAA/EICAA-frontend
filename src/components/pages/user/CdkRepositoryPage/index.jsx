import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import { PATHS } from '../../../../utils/constants';
import MenuBar from '../../../common/MenuBar';
import Button from '../../../common/ui/Buttons/Button';
import plusCircle from '../../../../assets/icons/plus-circle.svg';
import './index.scss';

const CdkRepositoryPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className="cdk-repository-page">
      <div className="cdk-repository-page__container">
        <MenuBar />
        <div className="cdk-repository-page__content">
          <div className="cdk-repository-page__header">
            <h1 className="cdk-repository-page__header-title">
              {intl.messages.user?.cdkRepositoryPage.title}
            </h1>
            <Button
              className="dashboard-page__header-button"
              label={intl.messages.user?.dashboardPage.createNewAssessment}
              icon={plusCircle}
              handleClick={() => navigate(`${PATHS.user}${PATHS.assessments}${PATHS.create}`)}
            />
          </div>
          <div className="cdk-repository-page__body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CdkRepositoryPage;
