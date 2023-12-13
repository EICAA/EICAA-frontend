import React from 'react';
import { useIntl } from 'react-intl';
import { ASSESSMENT_LIST_TYPES } from '../../../../utils/constants';
import AssessmentList from '../../../common/AssessmentList';
import MenuBar from '../../../common/MenuBar';
import PageContentHeader from '../../../common/PageContentHeader';
import './index.scss';

const AssessmentArchivedPage = () => {
  const intl = useIntl();

  return (
    <div className="assessment-archived-page">
      <div className="assessment-archived-page__container">
        <MenuBar />
        <div className="assessment-archived-page__content">
          <PageContentHeader
            headerText={intl.messages.user?.assessmentArchivedPage.title}
          />
          <div className="assessment-archived-page__body">
            <AssessmentList
              className="assessment-archived-page__assessment-list"
              title={intl.messages.user?.assessmentArchivedPage.archive}
              type={ASSESSMENT_LIST_TYPES.ARCHIVED}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentArchivedPage;
