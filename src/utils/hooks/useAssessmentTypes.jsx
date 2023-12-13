import React, { useCallback } from 'react';

import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';

export const useAssessmentTypes = () => {
  const [{ assessmentTypesQuestionsData, selectedAssessmentType }, dispatch] =
    React.useContext(AppContext);

  const setAssessmentTypeQuestionsData = useCallback(
    (assessmentTypesQuestionsData) => {
      dispatch({
        type: REDUCER_TYPES.SET_ASSESSMENT_TYPE_QUESTIONS_DATA,
        assessmentTypesQuestionsData,
      });
    },
    [dispatch],
  );
  const setSelectedAssessmentType = useCallback(
    (selectedAssessmentType) => {
      dispatch({
        type: REDUCER_TYPES.SET_SELECTED_ASSESSMENT_TYPE,
        selectedAssessmentType,
      });
    },
    [dispatch],
  );

  return [
    { assessmentTypesQuestionsData, selectedAssessmentType },
    { setAssessmentTypeQuestionsData, setSelectedAssessmentType },
  ];
};
