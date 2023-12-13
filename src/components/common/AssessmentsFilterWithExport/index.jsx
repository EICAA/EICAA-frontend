import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import {
  getAssessmentList,
  getAssessmentResultsAsCsv,
  getAssessmentResultsAsXlsx,
} from '../../../api/services/Assessments';
import { useDownloadFile, useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import { singleValueSelect } from '../../../utils/selectFieldStyles/singleValueSelect';
import Button from '../ui/Buttons/Button';
import SelectField from '../ui/SelectField';
import './index.scss';

/*
  This component just preserves earlier implementations,
  until the corresponding backend parts will be refactored.
  After that, parts of the code will be reused/refactored,
  then the remainder gets cleaned up.
*/

const AssessmentsFilterWithExport = (props) => {
  const [assessmentList, setAssessmentList] = useState([]);
  const [selectedAssessmentOption, setSelectedAssessmentOption] = useState();

  const { className } = props;

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const assessmentsOptions = useMemo(() => {
    return (assessmentList || []).map((item) => ({
      label: item.name,
      value: `${item.id}`,
    }));
  }, [assessmentList]);

  const getResultsAsXlsx = useDownloadFile({
    id: selectedAssessmentOption?.value,
    fetchFromApi: getAssessmentResultsAsXlsx,
    getDownloadedFilename: (id) => `eicaa-assessment-${id}-results.xlsx`,
  });

  const getResultsAsCsv = useDownloadFile({
    id: selectedAssessmentOption?.value,
    fetchFromApi: getAssessmentResultsAsCsv,
    getDownloadedFilename: (id) => `eicaa-assessment-${id}-results.csv`,
  });

  useEffect(() => {
    const fetchAssessmentListOptions = async () => {
      try {
        loadingLayer.show();

        const query = { start: 0, limit: Math.pow(2, 31) - 1, findMode: 'tuple' };

        const response = await getAssessmentList(query);
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
  }, [loadingLayer, showErrorModal]);

  useEffect(() => {
    const fetchAssessmentListOptions = async () => {
      try {
        loadingLayer.show();

        const query = { start: 0, limit: Math.pow(2, 31) - 1, findMode: 'tuple' };

        const response = await getAssessmentList(query);
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
  }, [loadingLayer, showErrorModal]);

  return (
    <div className={classnames('assessments-filter-with-export', className && className)}>
      <div className="assessments-filter-with-export__header">
        <SelectField
          className="assessments-filter-with-export__select"
          placeholder={intl.messages.common?.assessment}
          name="assessment"
          onChange={setSelectedAssessmentOption}
          styles={singleValueSelect}
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
      <div className="assessments-filter-with-export__footer">
        <Button
          className="assessments-filter-with-export__button"
          label={`${intl.messages.user?.assessmentsPage.export} (xlsx)`}
          icon={null}
          handleClick={getResultsAsXlsx}
          disabled={!selectedAssessmentOption}
        />
        <Button
          className="assessments-filter-with-export__button"
          label={`${intl.messages.user?.assessmentsPage.export} (csv)`}
          icon={null}
          handleClick={getResultsAsCsv}
          disabled={!selectedAssessmentOption}
        />
      </div>
    </div>
  );
};

export default AssessmentsFilterWithExport;
