import React, { useReducer } from 'react';
import { AppContext } from './';

export const INITIAL_STATE = {
  error: null,
  intl: {},
  selectedAssessmentType: 'student',
  assessmentTypesQuestionsData: {},
};

export const ContextProvider = ({ reducer, initialState, children }) => {
  const contextValue = useReducer(reducer, initialState);
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
