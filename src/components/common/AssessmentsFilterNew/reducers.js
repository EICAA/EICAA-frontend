import { EXTENDED_CHECKBOX_STATUSES } from '../../../utils/constants';

const AssessmentsResultsActions = {
  SetAssessments: 'setAssessments',
  SetResults: 'setResults',
};

const assessmentsResultsReducer = (state, action) => {
  switch (action.type) {
    case AssessmentsResultsActions.SetAssessments: {
      const { assessments, reset } = action.payload;

      return assessments.reduce(
        (acc, assessment) => {
          acc[assessment.id] = { ...assessment, assessmentResults: {} };
          return acc;
        },
        reset ? {} : { ...state },
      );
    }

    case AssessmentsResultsActions.SetResults: {
      const { id, results } = action.payload;
      const assessment = state[id];

      const assessmentResults = results.reduce((acc, result) => {
        acc[result.id] = result;
        return acc;
      }, {});

      return { ...state, [id]: { ...assessment, assessmentResults } };
    }

    default: {
      return state;
    }
  }
};

const AssessmentsActions = {
  SetAssessments: 'setAssessments',
  SetAssessmentSelection: 'setAssessmentSelection',
};

const assessmentsReducer = (state, action) => {
  switch (action.type) {
    case AssessmentsActions.SetAssessments: {
      const { assessments, reset } = action.payload;

      return assessments.reduce(
        (acc, assessment) => {
          acc[assessment.id] = EXTENDED_CHECKBOX_STATUSES.UNCHECKED;
          return acc;
        },
        reset ? {} : { ...state },
      );
    }

    case AssessmentsActions.SetAssessmentSelection: {
      const { id, selectionStatus } = action.payload;

      return { ...state, [id]: selectionStatus };
    }

    default: {
      return state;
    }
  }
};

const ResultsActions = {
  SetResultSelection: 'setResultSelection',
  SetResultsSelection: 'setResultsSelection',
};

const resultsReducer = (state, action) => {
  switch (action.type) {
    case ResultsActions.SetResultSelection: {
      const { id, selected } = action.payload;

      return { ...state, [id]: selected };
    }

    case ResultsActions.SetResultsSelection: {
      const { resultIds, selected } = action.payload;

      return resultIds.reduce(
        (acc, id) => {
          acc[id] = selected;
          return acc;
        },
        { ...state },
      );
    }

    default: {
      return state;
    }
  }
};

export {
  AssessmentsResultsActions,
  assessmentsResultsReducer,
  AssessmentsActions,
  assessmentsReducer,
  ResultsActions,
  resultsReducer,
};
