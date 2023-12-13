import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';

import {
  getAssessmentListWithRecentResults,
  postAssessmentsRecentResults,
} from '../../../api/services/Assessments';
import { useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import { multiValueSelect } from '../../../utils/selectFieldStyles/multiValueSelect';
import RadioButtonSelect from '../ui/RadioButtonSelect';
import SelectField from '../ui/SelectField';
import LineChart from './LineChart';
import { makeBinnings } from './utils';
import './index.scss';

const AssessmentActivity = (props) => {
  const { className } = props;
  const [assessmentList, setAssessmentList] = useState([]);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('student');
  const [selectedTimeSpan, setSelectedTimeSpan] = useState('7');
  const [selectedAssessments, setSelectedAssessments] = useState();
  const [resultsData, setResultsData] = useState({});

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const assessmentsOptions = useMemo(() => {
    return (assessmentList || []).map((item) => ({
      label: item.name,
      value: `${item.id}`,
    }));
  }, [assessmentList]);

  const assessmentTypeRadioSelectOptions = useMemo(
    () => [
      {
        label: intl.messages.common?.students,
        value: 'student',
      },
      {
        label: intl.messages.common?.employees,
        value: 'employee',
      },
    ],
    [intl],
  );

  const recentDaysRadioSelectOptions = useMemo(() => {
    const days = [180, 30, 7];

    return days.map((day) => ({
      label: `${day} ${intl.messages.user?.dashboardPage.days}`,
      value: `${day}`,
    }));
  }, [intl]);

  const binnedData = useMemo(() => {
    return makeBinnings(assessmentList, resultsData, selectedTimeSpan, new Date());
  }, [assessmentList, resultsData, selectedTimeSpan]);

  useEffect(() => {
    const fetchAssessmentListOptions = async () => {
      try {
        loadingLayer.show();

        const query = { assessmentType: selectedAssessmentType, days: selectedTimeSpan };

        const response = await getAssessmentListWithRecentResults(query);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data && data.meta) {
          setAssessmentList(data.data);
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    };

    fetchAssessmentListOptions();
  }, [selectedTimeSpan, selectedAssessmentType, loadingLayer, showErrorModal]);

  useEffect(() => {
    const fetchAssessmentsResults = async () => {
      let assessmentIds = [];

      if (selectedAssessments) {
        if (Array.isArray(selectedAssessments)) {
          assessmentIds.push(...selectedAssessments.map((assessment) => assessment.value));
        }
      }

      if (assessmentIds.length) {
        try {
          loadingLayer.show();

          const response = await postAssessmentsRecentResults(assessmentIds, selectedTimeSpan);
          const { data, status } = response;

          if (status >= 200 && status < 300 && data.data) {
            setResultsData(data.data);
          }
        } catch (err) {
          showErrorModal(err);
        } finally {
          loadingLayer.hide();
        }
      }
    };

    fetchAssessmentsResults();
  }, [selectedAssessments, selectedTimeSpan, loadingLayer, showErrorModal]);

  return (
    <div className={classnames('assessment-activity', className && className)}>
      <h2 className="assessment-activity__title">
        {intl.messages.user?.dashboardPage.recentActivity}
      </h2>
      <div className="assessment-activity__header">
        <div className="assessment-activity__radio-group">
          <RadioButtonSelect
            className="assessments-activity__radio-input"
            options={assessmentTypeRadioSelectOptions}
            name="assessmentType"
            label={`${intl.messages.user?.assessmentsPage.assessmentType}*`}
            value={selectedAssessmentType}
            onChange={(event) => {
              setSelectedAssessments(null);
              setResultsData(null);
              setSelectedAssessmentType(event.target?.value);
            }}
          />
          <RadioButtonSelect
            className="assessments-activity__radio-input"
            options={recentDaysRadioSelectOptions}
            name="timeSpan"
            label={`${intl.messages.user?.dashboardPage.timeRangeShown}*`}
            value={selectedTimeSpan}
            onChange={(event) => {
              setSelectedAssessments(null);
              setResultsData(null);
              setSelectedTimeSpan(event.target?.value);
            }}
          />
        </div>
        <SelectField
          className="assessments-filter-with-export__select -multi"
          placeholder={intl.messages.common?.assessment}
          name="assessment"
          value={selectedAssessments}
          isMulti
          onChange={setSelectedAssessments}
          styles={multiValueSelect}
          isClearable={true}
          isSearchable={true}
          options={assessmentsOptions}
          filterOption={(option, input) => {
            if (option) {
              return option.label.toLowerCase().startsWith(input.toLowerCase());
            }
          }}
        />
      </div>
      <div className="assessment-activity__content">
        <LineChart binnedData={binnedData} />
      </div>
    </div>
  );
};

export default AssessmentActivity;
