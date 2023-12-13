import React, { useEffect, /*useMemo, useState,*/ useReducer } from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
/* import {
  // getAssessmentList,
  getAssessmentResultsAsCsv,
  getAssessmentResultsAsXlsx,
} from '../../../api/services/Assessments'; */
import { responses } from '../../../api/services/Assessments/mocks';
import { /*useDownloadFile,*/ useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
// import { singleValueSelect } from '../../../utils/selectFieldStyles/singleValueSelect';
import {
  EXTENDED_CHECKBOX_STATUSES,
  ASSESSMENTS_FILTER_REDUCER_TYPES as REDUCER_TYPE,
} from '../../../utils/constants';
// import SelectField from '../../common/ui/SelectField';
import Button from '../../common/ui/Buttons/Button';
import AssessmentsFilterTree from './AssessmentsFilterTree';
import './index.scss';

const idNumberSort = (item1, item2) => item1.id - item2.id;
const idTextSort = (item1, item2) => {
  if (item1.id < item2.id) {
    return -1;
  }
  if (item1.id > item2.id) {
    return 1;
  }
  return 0;
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.INITIALIZE:
      return action.payload;

    case REDUCER_TYPE.CHECK:
      return [...action.payload.items, action.payload.item].sort(idNumberSort);

    case REDUCER_TYPE.UNCHECK:
      return [...action.payload.items, action.payload.item].sort(idNumberSort);

    case REDUCER_TYPE.PARTIAL:
      return [...action.payload.items, action.payload.item].sort(idNumberSort);

    default:
      return state;
  }
};

const subItemReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_TYPE.INITIALIZE:
      return action.payload.sort(idTextSort);

    case REDUCER_TYPE.CHECK:
      return [...action.payload.restOfSubmissions, ...action.payload.selectedSubmissions].sort(
        idTextSort,
      );

    case REDUCER_TYPE.UNCHECK:
      return [...action.payload.restOfSubmissions, ...action.payload.selectedSubmissions].sort(
        idTextSort,
      );

    default:
      return state;
  }
};

const AssessmentsFilter = (props) => {
  const [filteredItems, dispatchItems] = useReducer(itemReducer, []);
  const [filteredSubItems, dispatchSubItems] = useReducer(subItemReducer, []);

  const { className } = props;

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const initializeAssessments = (assessments) => {
    const filteredSubmissions = assessments.flatMap((assessment) => {
      return assessment.submissions.map((submission) => {
        submission.checked = false;
        submission.assessmentId = assessment.id;

        return submission;
      });
    });

    const filteredAssessments = assessments.map((assessment) => {
      assessment.checked = EXTENDED_CHECKBOX_STATUSES.UNCHECKED;
      assessment.submissionIds = assessment.submissions.map((submission) => submission.id);
      delete assessment.submissions;

      return assessment;
    });

    dispatchItems({ type: REDUCER_TYPE.INITIALIZE, payload: filteredAssessments });
    dispatchSubItems({ type: REDUCER_TYPE.INITIALIZE, payload: filteredSubmissions });
  };

  const handleSelections = (id) => {
    const selectedItem = filteredItems.find((value) => value.id === id);
    const restOfItems = filteredItems.filter((value) => value.id !== selectedItem?.id);
    const selectedSubmissions = filteredSubItems.filter(
      (submission) => submission.assessmentId === id,
    );
    const restOfSubmissions = filteredSubItems.filter(
      (submission) => submission.assessmentId !== id,
    );

    switch (selectedItem.checked) {
      case EXTENDED_CHECKBOX_STATUSES.UNCHECKED:
        selectedItem.checked = EXTENDED_CHECKBOX_STATUSES.CHECKED;
        dispatchItems({
          type: REDUCER_TYPE.CHECK,
          payload: { item: selectedItem, items: restOfItems },
        });
        selectedSubmissions.map((submission) => (submission.checked = true));
        dispatchSubItems({
          type: REDUCER_TYPE.CHECK,
          payload: {
            selectedSubmissions: selectedSubmissions,
            restOfSubmissions: restOfSubmissions,
          },
        });
        break;

      case EXTENDED_CHECKBOX_STATUSES.CHECKED:
        selectedItem.checked = EXTENDED_CHECKBOX_STATUSES.UNCHECKED;
        dispatchItems({
          type: REDUCER_TYPE.UNCHECK,
          payload: { item: selectedItem, items: restOfItems },
        });
        selectedSubmissions.map((submission) => (submission.checked = false));
        dispatchSubItems({
          type: REDUCER_TYPE.UNCHECK,
          payload: {
            selectedSubmissions: selectedSubmissions,
            restOfSubmissions: restOfSubmissions,
          },
        });
        break;

      case EXTENDED_CHECKBOX_STATUSES.PARTIAL:
        selectedItem.checked = EXTENDED_CHECKBOX_STATUSES.CHECKED;
        dispatchItems({
          type: REDUCER_TYPE.CHECK,
          payload: { item: selectedItem, items: restOfItems },
        });
        selectedSubmissions.map((submission) => (submission.checked = true));
        dispatchSubItems({
          type: REDUCER_TYPE.CHECK,
          payload: {
            selectedSubmissions: selectedSubmissions,
            restOfSubmissions: restOfSubmissions,
          },
        });
        break;

      default:
        break;
    }
  };

  const checkForPartial = (submission, submissions) => {
    return !!submissions
      .filter((value) => value.assessmentId === submission[0].assessmentId)
      .find((value) => value.checked !== submission[0].checked);
  };

  const selectedSubmissions = (id) => {
    const selectedSubmission = filteredSubItems.filter((submission) => submission.id === id);
    const restOfSubmissions = filteredSubItems.filter((submission) => submission.id !== id);

    if (selectedSubmission[0].checked) {
      selectedSubmission[0].checked = false;

      dispatchSubItems({
        type: REDUCER_TYPE.UNCHECK,
        payload: { selectedSubmissions: selectedSubmission, restOfSubmissions: restOfSubmissions },
      });

      if (checkForPartial(selectedSubmission, restOfSubmissions)) {
        const partialItem = filteredItems.find(
          (value) => value.id === selectedSubmission[0].assessmentId,
        );
        const restOfItems = filteredItems.filter(
          (value) => value.id !== selectedSubmission[0].assessmentId,
        );

        partialItem.checked = EXTENDED_CHECKBOX_STATUSES.PARTIAL;

        dispatchItems({
          type: REDUCER_TYPE.PARTIAL,
          payload: { item: partialItem, items: restOfItems },
        });
      } else {
        const uncheckedItem = filteredItems.find(
          (value) => value.id === selectedSubmission[0].assessmentId,
        );
        const restOfItems = filteredItems.filter(
          (value) => value.id !== selectedSubmission[0].assessmentId,
        );

        uncheckedItem.checked = EXTENDED_CHECKBOX_STATUSES.UNCHECKED;

        dispatchItems({
          type: REDUCER_TYPE.UNCHECK,
          payload: { item: uncheckedItem, items: restOfItems },
        });
      }
    } else {
      selectedSubmission[0].checked = true;

      dispatchSubItems({
        type: REDUCER_TYPE.CHECK,
        payload: { selectedSubmissions: selectedSubmission, restOfSubmissions: restOfSubmissions },
      });

      if (checkForPartial(selectedSubmission, restOfSubmissions)) {
        const partialItem = filteredItems.find(
          (value) => value.id === selectedSubmission[0].assessmentId,
        );
        const restOfItems = filteredItems.filter(
          (value) => value.id !== selectedSubmission[0].assessmentId,
        );

        partialItem.checked = EXTENDED_CHECKBOX_STATUSES.PARTIAL;

        dispatchItems({
          type: REDUCER_TYPE.PARTIAL,
          payload: { item: partialItem, items: restOfItems },
        });
      } else {
        const checkedItem = filteredItems.find(
          (value) => value.id === selectedSubmission[0].assessmentId,
        );
        const restOfItems = filteredItems.filter(
          (value) => value.id !== selectedSubmission[0].assessmentId,
        );

        checkedItem.checked = EXTENDED_CHECKBOX_STATUSES.CHECKED;

        dispatchItems({
          type: REDUCER_TYPE.CHECK,
          payload: { item: checkedItem, items: restOfItems },
        });
      }
    }
  };

  // TODO: Adapt to current filtered lists
  /* const getResultsAsXlsx = useDownloadFile({
    id: selectedAssessmentOption?.value,
    fetchFromApi: getAssessmentResultsAsXlsx,
    getDownloadedFilename: (id) => `eicaa-assessment-${id}-results.xlsx`,
  });

  const getResultsAsCsv = useDownloadFile({
    id: selectedAssessmentOption?.value,
    fetchFromApi: getAssessmentResultsAsCsv,
    getDownloadedFilename: (id) => `eicaa-assessment-${id}-results.csv`,
  }); */

  useEffect(() => {
    const fetchAssessmentListOptions = async () => {
      try {
        loadingLayer.show();

        const query = { start: 0, limit: Math.pow(2, 31) - 1, findMode: 'tuple' };

        // const response = await getAssessmentList(query);
        const response = responses.getAssessmentList(query);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data && data.meta) {
          initializeAssessments(data.data);
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
    <div className={classnames('assessments-filter', className && className)}>
      {/* <div className="assessments-filter__header">
        <SelectField
          className="assessments-filter__select"
          placeholder={intl.messages.common?.assessment}
          name="assessment"
          onChange={setSelectedAssessmentOption}
          styles={singleValueSelect}
          isClearable={true}
          isSearchable={true}
          options={[]}
          filterOption={(option, input) => {
            if (option) {
              return option.value.toLowerCase().startsWith(input.toLowerCase());
            }
          }}
        />
      </div> */}
      <div className="assessments-filter__body">
        <AssessmentsFilterTree
          className="assessments-filter__tree"
          filteredItems={filteredItems}
          dispatchItems={dispatchItems}
          filteredSubItems={filteredSubItems}
          dispatchSubItems={dispatchSubItems}
          handleSelections={handleSelections}
          selectedSubmissions={selectedSubmissions}
        />
      </div>
      <div className="assessments-filter__footer">
        <Button
          className="assessments-filter__button"
          label={`${intl.messages.user?.assessmentsPage.exportData} (xlsx)`}
          icon={null}
          // handleClick={getResultsAsXlsx}
          // disabled={false} // TODO: adapt to current filtered lists
        />
        <Button
          className="assessments-filter__button"
          label={`${intl.messages.user?.assessmentsPage.exportData} (csv)`}
          icon={null}
          // handleClick={getResultsAsCsv}
          // disabled={false} // TODO: adapt to current filtered lists
        />
      </div>
    </div>
  );
};

export default AssessmentsFilter;
