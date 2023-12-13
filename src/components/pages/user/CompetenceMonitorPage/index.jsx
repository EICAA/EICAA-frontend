import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import filtersIcon from '../../../../assets/icons/filters.svg';
import lightBulbBlackIcon from '../../../../assets/icons/light-bulb-black.svg';
import AssessmentsCharts from '../../../common/AssessmentsCharts';
// import AssessmentsFilter from '../../../common/AssessmentsFilter';
import AssessmentsFilterNew from '../../../common/AssessmentsFilterNew';
// import AssessmentsFilterWithExport from '../../../common/AssessmentsFilterWithExport';
// import GroupedRecommendations from '../../../common/AssessmentsCdkRecommendations/GroupedRecommendations';
import SingleListRecommendations from '../../../common/AssessmentsCdkRecommendations/SingleListRecommendations';
import MenuBar from '../../../common/MenuBar';
import PageContentHeader from '../../../common/PageContentHeader';
import ToggleSlidePanel from '../../../common/ui/ToggleSlidePanel';
import './index.scss';

const CompetenceMonitorPage = () => {
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isRecommendedCdksPanelOpen, setRecommendedCdksPanelOpen] = useState(false);
  const [requestedData, setRequestedData] = useState([]);
  const [requestedDataMetrics, setRequestedDataMetrics] = useState({});
  const intl = useIntl();

  return (
    <div className="assessments-page">
      <div className="assessments-page__container">
        <MenuBar />
        <div className="assessments-page__content-wrapper">
          <div className="assessments-page__content">
            <PageContentHeader headerText={intl.messages.user?.assessmentsPage.title} />
            <div className="assessments-page__body">
              {/*<AssessmentsFilterWithExport />*/}
              <div className="assessments-page__assessments-charts-wrapper">
                <AssessmentsCharts
                  className="assessments-page__assessments-charts"
                  requestedData={requestedData}
                  requestedDataMetrics={requestedDataMetrics}
                />
              </div>
            </div>
          </div>
          <ToggleSlidePanel
            icon={filtersIcon}
            isOpen={isFilterPanelOpen}
            setIsOpen={setFilterPanelOpen}
            className="filter"
          >
            {/*<AssessmentsFilter className="assessments-page__assessments-filter" />*/}
            <AssessmentsFilterNew
              className="assessments-page__assessments-filter"
              setFilterPanelOpen={setFilterPanelOpen}
              setRequestedData={setRequestedData}
              setRequestedDataMetrics={setRequestedDataMetrics}
            />
          </ToggleSlidePanel>
          {requestedData.length > 0 ? (
            <ToggleSlidePanel
              icon={lightBulbBlackIcon}
              isOpen={isRecommendedCdksPanelOpen}
              setIsOpen={setRecommendedCdksPanelOpen}
              className="recommendation"
              opensFromLeft={false}
            >
              <SingleListRecommendations
                className="assessments-page__assessments-cdk-recommendations"
                requestedData={requestedData}
              />
            </ToggleSlidePanel>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CompetenceMonitorPage;
