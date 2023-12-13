import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppContext } from '../../../../storage/context';
import { ASSESSMENT_LIST_TYPES, PATHS } from '../../../../utils/constants';
import AssessmentList from '../../../common/AssessmentList';
import AssessmentActivity from '../../../common/AssessmentActivity';
import MenuBar from '../../../common/MenuBar';
import Button from '../../../common/ui/Buttons/Button';
import plusCircle from '../../../../assets/icons/plus-circle.svg';
import './index.scss';

const DashboardPage = () => {
  const { user } = React.useContext(AppContext)[0];

  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__container">
        <MenuBar />
        <div className="dashboard-page__content">
          <div className="dashboard-page__header">
            <h1 className="dashboard-page__header-title">
              {`${intl.messages.user?.dashboardPage.title}${
                user && ` ${user.firstName} ${user.lastName}`
              }!`}
            </h1>
            <Button
              className="dashboard-page__header-button"
              label={intl.messages.user?.dashboardPage.createNewAssessment}
              icon={plusCircle}
              handleClick={() => navigate(`${PATHS.user}${PATHS.assessments}${PATHS.create}`)}
            />
          </div>
          <div className="dashboard-page__body">
            <AssessmentList
              className="dashboard-page__assessment-list"
              title={intl.messages.user?.dashboardPage.liveAssessments}
              type={ASSESSMENT_LIST_TYPES.LIVE}
            />
            <AssessmentActivity className="dashboard-page__assessment-activity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
