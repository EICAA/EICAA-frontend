const setStorage = (state, { storage }) => {
  if (storage) {
    state.storage = storage;
    state.isSet = true;
  }
  return { ...state };
};

const setErrorModal = (state, { errorModal }) => {
  if (errorModal) {
    state.errorModal = errorModal;
  }
  return { ...state };
};

const setImageModal = (state, { imageModal }) => {
  if (imageModal) {
    state.imageModal = imageModal;
  }
  return { ...state };
};

const setModalData = (state, { modalData }) => {
  if (modalData) {
    state.modalData = modalData;
  }
  return { ...state };
};

const setPromptModalData = (state, { promptModalData }) => {
  if (promptModalData) {
    state.promptModalData = promptModalData;
  }
  return { ...state };
};

const setSnackBarData = (state, { snackBarData }) => {
  state.snackBarData = snackBarData;
  return { ...state };
};

const setAssessmentLanguage = (state, { assessmentLanguage }) => {
  state.assessmentLanguage = assessmentLanguage;
  return { ...state };
};

const setIsLoading = (state, { isLoading }) => {
  state.isLoading = isLoading;
  return { ...state };
};

const setToken = (state, { token }) => {
  state.token = token;
  return { ...state };
};

const setSelectedLanguage = (state, { selectedLanguage }) => {
  state.selectedLanguage = selectedLanguage;
  return { ...state };
};

const setSelectedParticipantLanguage = (state, { selectedParticipantLanguage }) => {
  state.selectedParticipantLanguage = selectedParticipantLanguage;
  return { ...state };
};

const setHelpers = (state, { helpers }) => {
  state.helpers = helpers;
  return { ...state };
};

const setUser = (state, { user }) => {
  state.user = user;
  return { ...state };
};

const setCdkModule = (state, { cdkModule }) => {
  return { ...state, cdkModule };
};

const setCdkListSearchParams = (state, { cdkListSearchParams }) => {
  return { ...state, cdkListSearchParams };
};

const setAssessmentTypeQuestionsData = (state, { assessmentTypesQuestionsData }) => {
  return {
    ...state,
    assessmentTypesQuestionsData,
  };
};

const setSelectedAssessmentType = (state, { selectedAssessmentType }) => {
  return { ...state, selectedAssessmentType };
};

const nullErrorModal = (state) => {
  state.errorModal = null;
  return { ...state };
};

const nullImageModal = (state) => {
  state.imageModal = null;
  return { ...state };
};

const nullModalData = (state) => {
  state.modalData = null;
  return { ...state };
};

const nullPromptModalData = (state) => {
  state.promptModalData = null;
  return { ...state };
};

const nullSnackBarData = (state) => {
  state.snackBarData = null;
  return { ...state };
};

const nullToken = (state) => {
  state.token = '';
  return { ...state };
};

const nullUser = (state) => {
  state.user = {};
  return { ...state };
};

const actions = {
  setStorage,
  setErrorModal,
  setImageModal,
  setModalData,
  setPromptModalData,
  setSnackBarData,
  setAssessmentLanguage,
  setIsLoading,
  setToken,
  setSelectedLanguage,
  setSelectedParticipantLanguage,
  setHelpers,
  setUser,
  setCdkModule,
  setCdkListSearchParams,
  setAssessmentTypeQuestionsData,
  setSelectedAssessmentType,
  nullErrorModal,
  nullImageModal,
  nullModalData,
  nullPromptModalData,
  nullSnackBarData,
  nullToken,
  nullUser,
};

export const reducer = (state, action) => {
  if (action && action.type && actions[action.type]) {
    return actions[action.type](state, action);
  }
  return { ...state };
};
