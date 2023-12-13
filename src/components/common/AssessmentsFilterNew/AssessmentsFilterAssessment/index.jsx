import React, { useCallback, useMemo, useState } from 'react';

import { getAssessmentResults } from '../../../../api/services/Assessments';
import folderClosedGray from '../../../../assets/icons/folder-closed-gray.svg';
import { EXTENDED_CHECKBOX_STATUSES } from '../../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../../utils/hooks';
import CheckboxIndeterminate from '../../ui/CheckboxIndeterminate';
import AssessmentsFilterResult from '../AssessmentsFilterResult';
import { AssessmentsResultsActions, AssessmentsActions, ResultsActions } from '../reducers';
import './index.scss';

const updateAssessmentSelectionStateLogics = (
  id,
  selectedAssessment,
  assessmentResultIds,
  selectedAssessmentResultsIds,
  dispatchAssessments,
) => {
  return (resultId, selected) => {
    let newState;

    if (selected) {
      newState = EXTENDED_CHECKBOX_STATUSES.PARTIAL;

      if (
        !selectedAssessmentResultsIds.includes(resultId) &&
        selectedAssessmentResultsIds.length + 1 === assessmentResultIds.length
      ) {
        newState = EXTENDED_CHECKBOX_STATUSES.CHECKED;
      }
    } else {
      if (selectedAssessmentResultsIds.length) {
        newState = EXTENDED_CHECKBOX_STATUSES.PARTIAL;

        if (selectedAssessmentResultsIds.length < 2) {
          newState = EXTENDED_CHECKBOX_STATUSES.UNCHECKED;
        }
      }
    }

    if (newState !== selectedAssessment) {
      dispatchAssessments({
        type: AssessmentsActions.SetAssessmentSelection,
        payload: { id, selectionStatus: newState },
      });
    }
  };
};

const AssessmentsFilterAssessmentResults = (props) => {
  const {
    id,
    opened,
    assessmentType,
    selectedAssessment,
    assessmentResults,
    assessmentResultIds,
    results,
    dispatchAssessments,
    dispatchResults,
    demographicsFieldLabels,
    demographicsValuesLabels,
  } = props;

  const selectedAssessmentResultsIds = useMemo(() => {
    return (assessmentResultIds || []).filter((result) => !!results[result]);
  }, [assessmentResultIds, results]);

  const updateAssessmentSelectionState = useCallback(
    (resultId, selected) => {
      updateAssessmentSelectionStateLogics(
        id,
        selectedAssessment,
        assessmentResultIds,
        selectedAssessmentResultsIds,
        dispatchAssessments,
      )(resultId, selected);
    },
    [
      id,
      selectedAssessment,
      assessmentResultIds,
      selectedAssessmentResultsIds,
      dispatchAssessments,
    ],
  );

  const assessmentResultValues = useMemo(
    () => Object.values(assessmentResults || {}),
    [assessmentResults],
  );

  const labels = useMemo(
    () => demographicsFieldLabels[assessmentType],
    [demographicsFieldLabels, assessmentType],
  );

  const values = useMemo(
    () => demographicsValuesLabels[assessmentType],
    [demographicsValuesLabels, assessmentType],
  );

  if (!opened) {
    return null;
  }

  return (
    <div className="assessment-filter-assessment__results">
      {assessmentResultValues.length
        ? assessmentResultValues.map((result) => (
            <AssessmentsFilterResult
              key={result.id}
              assessmentType={assessmentType}
              result={result}
              results={results}
              dispatchResults={dispatchResults}
              updateAssessmentSelectionState={updateAssessmentSelectionState}
              labels={labels}
              values={values}
            />
          ))
        : null}
    </div>
  );
};

const AssessmentsFilterAssessment = (props) => {
  const {
    id,
    name,
    assessmentType,
    assessmentResults,
    assessments,
    results,
    dispatchAssessmentsResults,
    dispatchAssessments,
    dispatchResults,
    demographicsFieldLabels,
    demographicsValuesLabels,
  } = props;

  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const [opened, setOpened] = useState(false);

  const selectedAssessment = useMemo(() => assessments[id], [assessments, id]);

  const assessmentResultIds = useMemo(() => Object.keys(assessmentResults), [assessmentResults]);

  const onClick = useCallback(() => {
    const selectionStatus =
      selectedAssessment === EXTENDED_CHECKBOX_STATUSES.CHECKED
        ? EXTENDED_CHECKBOX_STATUSES.UNCHECKED
        : EXTENDED_CHECKBOX_STATUSES.CHECKED;

    dispatchAssessments({
      type: AssessmentsActions.SetAssessmentSelection,
      payload: { id, selectionStatus },
    });

    dispatchResults({
      type: ResultsActions.SetResultsSelection,
      payload: {
        resultIds: assessmentResultIds,
        selected: selectionStatus === EXTENDED_CHECKBOX_STATUSES.CHECKED,
      },
    });
  }, [id, selectedAssessment, assessmentResultIds, dispatchAssessments, dispatchResults]);

  const onFolderClick = useCallback(
    async (id) => {
      try {
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
      setOpened(!opened);
      const { data, status } = await getAssessmentResults(id, { findMode: 'compact' });

      if (status >= 200 && status < 300 && data.data && data.meta) {
        dispatchAssessmentsResults({
          type: AssessmentsResultsActions.SetResults,
          payload: { id, results: data.data },
        });

        if (selectedAssessment === EXTENDED_CHECKBOX_STATUSES.CHECKED) {
          const resultIds = data.data.map((result) => result.id);
          dispatchResults({
            type: ResultsActions.SetResultsSelection,
            payload: {
              resultIds,
              selected: true,
            },
          });
        }
      }
    },
    [
      opened,
      setOpened,
      loadingLayer,
      showErrorModal,
      selectedAssessment,
      dispatchAssessmentsResults,
      dispatchResults,
    ],
  );

  return (
    <div className="assessment-filter-assessment">
      <div className="assessment-filter-assessment__heading">
        <CheckboxIndeterminate
          className="assessment-filter-assessment__checkbox"
          name={`assessment-${id}`}
          value={id}
          onChange={onClick}
          checked={selectedAssessment}
        />
        <div className="assessment-filter-assessment__label" onClick={() => onFolderClick(id)}>
          <img src={folderClosedGray} alt="folder-icon" />
          <span>{name}</span>
        </div>
      </div>
      <AssessmentsFilterAssessmentResults
        id={id}
        opened={opened}
        assessmentType={assessmentType}
        selectedAssessment={selectedAssessment}
        assessmentResults={assessmentResults}
        assessmentResultIds={assessmentResultIds}
        results={results}
        dispatchAssessments={dispatchAssessments}
        dispatchResults={dispatchResults}
        demographicsFieldLabels={demographicsFieldLabels}
        demographicsValuesLabels={demographicsValuesLabels}
      />
      <div className="assessment-filter-assessment__separator"> </div>
    </div>
  );
};

export default AssessmentsFilterAssessment;
