import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';

import {
  getAssessmentHelpCsvFile,
  getAssessmentList,
  getAssessmentQuestions,
  postAssessmentsResultsFiltered,
  postAssessmentsResultsFilteredFormat,
} from '../../../api/services/Assessments';
import { AppContext } from '../../../storage/context';
import { useAssessmentTypes, useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import Button from '../ui/Buttons/Button';
import RadioButtonSelect from '../ui/RadioButtonSelect';
import AssessmentsFilterTree from './AssessmentsFilterTree';
import {
  assessmentsResultsReducer,
  assessmentsReducer,
  AssessmentsActions,
  resultsReducer,
  AssessmentsResultsActions,
} from './reducers';
import {
  getSelectionAsSingleList,
  getAssessmentTypeQuestionsData,
  transformRawResultToCompetenceScoreArray,
  getDemographicsFieldLabels,
  getDemographicsValuesLabels,
} from './utils';
import './index.scss';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';

const AssessmentsFilterNew = (props) => {
  const { setFilterPanelOpen, setRequestedData, setRequestedDataMetrics } = props;
  const dispatch = React.useContext(AppContext)[1];
  const [
    { assessmentTypesQuestionsData, selectedAssessmentType },
    { setAssessmentTypeQuestionsData, setSelectedAssessmentType },
  ] = useAssessmentTypes();
  const [assessmentsResults, dispatchAssessmentsResults] = useReducer(
    assessmentsResultsReducer,
    {},
  );
  const [assessments, dispatchAssessments] = useReducer(assessmentsReducer, {});
  const [results, dispatchResults] = useReducer(resultsReducer, {});
  const [isLoadingAssessmentTypeQuestionsData, setIsLoadingAssessmentTypeQuestionsData] =
    useState();

  const { className } = props;

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

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

  const demographicsFieldLabels = useMemo(() => getDemographicsFieldLabels(intl), [intl]);
  const demographicsValuesLabels = useMemo(() => getDemographicsValuesLabels(), []);

  const onUpdateDashboard = useCallback(async () => {
    try {
      const selectedAssessmentsResults = getSelectionAsSingleList(
        assessmentsResults,
        assessments,
        results,
      );

      if (selectedAssessmentsResults.length) {
        loadingLayer.show();

        const response = await postAssessmentsResultsFiltered({ selectedAssessmentsResults });
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data && data.meta) {
          const results = data.data;

          // Pre-format chart-presentable result data

          const requestedChartData = [];
          const values = Object.values(results);

          for (let item of values) {
            requestedChartData.push(...item.results);
          }

          setRequestedData(
            requestedChartData.map((result) =>
              transformRawResultToCompetenceScoreArray(
                assessmentTypesQuestionsData[selectedAssessmentType],
                result,
              ),
            ),
          );

          // Calc metrics

          const assessmentCount = Object.values(results).filter(
            (result) => result.results.length,
          ).length;
          const resultCount = requestedChartData.length;
          const averageSurveyTime =
            requestedChartData.reduce((acc, result) => {
              return acc + result.durationSeconds;
            }, 0) / requestedChartData.length;

          setRequestedDataMetrics({
            assessmentCount,
            resultCount,
            averageSurveyTime,
          });

          if (resultCount) {
            setFilterPanelOpen(false);
          } else {
            dispatch({
              type: REDUCER_TYPES.SET_MODAL_DATA,
              modalData: {
                intlMessages: intl.messages,
                title: intl.messages.user?.assessmentsPage.data.redactionTitle,
                message: intl.messages.user?.assessmentsPage.data.redactionNoResult,
              },
            });
          }
        }
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [
    selectedAssessmentType,
    assessmentTypesQuestionsData,
    assessmentsResults,
    assessments,
    results,
    dispatch,
    intl,
    loadingLayer,
    showErrorModal,
    setRequestedData,
    setRequestedDataMetrics,
    setFilterPanelOpen,
  ]);

  const onExportAsCsvs = useCallback(async () => {
    try {
      const selectedAssessmentsResults = getSelectionAsSingleList(
        assessmentsResults,
        assessments,
        results,
      );

      if (selectedAssessmentsResults.length) {
        loadingLayer.show();

        const response = await postAssessmentsResultsFilteredFormat(
          { selectedAssessmentsResults },
          'csv',
        );

        const href = URL.createObjectURL(response.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `results.zip`);
        document.body.appendChild(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(href);

        setFilterPanelOpen(false);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [assessmentsResults, assessments, results, loadingLayer, showErrorModal, setFilterPanelOpen]);

  const onHelp = useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await getAssessmentHelpCsvFile(selectedAssessmentType);

      const href = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `help-${selectedAssessmentType}.csv`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [selectedAssessmentType, loadingLayer, showErrorModal]);

  const fetchAssessmentTypeQuestionsData = useCallback(async () => {
    if (!assessmentTypesQuestionsData[selectedAssessmentType]) {
      try {
        setIsLoadingAssessmentTypeQuestionsData(true);
        loadingLayer.show();

        const response = await getAssessmentQuestions(selectedAssessmentType, 'en');
        const { data, status } = response;

        if (status >= 200 && status < 300 && data) {
          const assessmentTypeQuestionGroups = getAssessmentTypeQuestionsData(data.data); //create;
          setAssessmentTypeQuestionsData({
            ...assessmentTypesQuestionsData,
            [selectedAssessmentType]: assessmentTypeQuestionGroups, //data.data,
          });
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
        setIsLoadingAssessmentTypeQuestionsData(false);
      }
    }
  }, [
    selectedAssessmentType,
    assessmentTypesQuestionsData,
    setAssessmentTypeQuestionsData,
    loadingLayer,
    showErrorModal,
  ]);

  const fetchAssessmentListOptions = useCallback(async () => {
    try {
      loadingLayer.show();

      const query = {
        assessmentType: selectedAssessmentType,
        start: 0,
        limit: Math.pow(2, 31) - 1,
        findMode: 'compact',
      };

      const response = await getAssessmentList(query);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data && data.meta) {
        const assessmentsData = data.data;

        dispatchAssessmentsResults({
          type: AssessmentsResultsActions.SetAssessments,
          payload: { assessments: assessmentsData, reset: true },
        });
        dispatchAssessments({
          type: AssessmentsActions.SetAssessments,
          payload: { assessments: assessmentsData, reset: true },
        });
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [
    selectedAssessmentType,
    loadingLayer,
    showErrorModal,
    dispatchAssessmentsResults,
    dispatchAssessments,
  ]);

  useEffect(() => {
    if (!isLoadingAssessmentTypeQuestionsData) {
      fetchAssessmentTypeQuestionsData();
    }
  }, [isLoadingAssessmentTypeQuestionsData, fetchAssessmentTypeQuestionsData]);

  useEffect(() => {
    fetchAssessmentListOptions();
  }, [fetchAssessmentListOptions]);

  return (
    <div className={classnames('assessments-filter', className && className)}>
      <div className="assessments-filter__header">
        <p className="assessments-filter__title">{intl.messages.user?.assessmentsPage.dataQuery}</p>
        <RadioButtonSelect
          className="assessments-filter__radio-input"
          options={assessmentTypeRadioSelectOptions}
          name="assessmentType"
          label={`${intl.messages.user?.assessmentsPage.assessmentType}*`}
          value={selectedAssessmentType}
          onChange={(event) => {
            setSelectedAssessmentType(event.target?.value);
          }}
        />
      </div>
      {/* assessment filter input by name/type */}
      <div className="assessments-filter__content">
        <AssessmentsFilterTree
          assessmentsResults={assessmentsResults}
          assessments={assessments}
          results={results}
          dispatchAssessmentsResults={dispatchAssessmentsResults}
          dispatchAssessments={dispatchAssessments}
          dispatchResults={dispatchResults}
          demographicsFieldLabels={demographicsFieldLabels}
          demographicsValuesLabels={demographicsValuesLabels}
        />
      </div>
      <div className="assessments-filter__footer">
        <div className="assessments-filter__footer-actions">
          <Button
            className="assessments-filter__button"
            label={`${intl.messages.user?.assessmentsPage.updateDashboard}`}
            icon={null}
            handleClick={onUpdateDashboard}
            disabled={false}
          />
        </div>
        <div className="assessments-filter__footer-actions">
          <Button
            className="assessments-filter__button"
            label={`${intl.messages.user?.assessmentsPage.export} (raw csv)`}
            icon={null}
            handleClick={onExportAsCsvs}
            disabled={false}
          />
          <Button
            className="assessments-filter__button"
            label={`${intl.messages.user?.assessmentsPage.export} (keys)`}
            icon={null}
            handleClick={onHelp}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentsFilterNew;
