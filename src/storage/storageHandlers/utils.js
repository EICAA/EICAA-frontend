import { STORAGE_KEYS, PARTICIPANT_ASSESSMENTS_LOCAL_KEYS } from "./config";
import { getLocalStorage, setLocalStorage } from "./operations";

export const getLocalStorageAssessment = (assessmentCode) => {
  if (typeof assessmentCode !== "string") {
    throw new Error('Assessment LocalStorage get error. assessmentCode must be of type string');
  }
  if (!assessmentCode) {
    throw new Error('Assessment LocalStorage get error. Empty assessmentCode provided');
  }

  const assessments = getLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL);
  return assessments?.find(assessmentData => {
    return assessmentData[PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.ASSESSMENT_CODE] === assessmentCode;
  }) || {};
};

export const getLocalStorageAssessmentData = (assessmentCode, key) => {
  if (typeof assessmentCode !== "string") {
    throw new Error('Assessment LocalStorage get error. assessmentCode must be of type string');
  }
  if (typeof key !== "string") {
    throw new Error('Assessment LocalStorage get error. key must be of type string');
  }
  if (!assessmentCode) {
    throw new Error('Assessment LocalStorage get error. Empty assessmentCode provided');
  }
  if (!key) {
    throw new Error('Assessment LocalStorage get error. Empty key provided');
  }

  const assessments = getLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL);
  return assessments?.find(assessmentData => {
    return assessmentData[PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.ASSESSMENT_CODE] === assessmentCode;
  })?.[key];
};

export const setLocalStorageAssessmentData = (assessmentCode, key, value) => {
  if (typeof assessmentCode !== "string") {
    throw new Error('Assessment LocalStorage set error. assessmentCode must be of type string');
  }
  if (typeof key !== "string") {
    throw new Error('Assessment LocalStorage set error. key must be of type string');
  }
  if (!assessmentCode) {
    throw new Error('Assessment LocalStorage set error. Empty assessmentCode provided');
  }
  if (!key) {
    throw new Error('Assessment LocalStorage set error. Empty key provided');
  }

  const assessments = getLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL) || [];

  const index = assessments
    .map(assessmentData => assessmentData[PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.ASSESSMENT_CODE])
    .indexOf(assessmentCode);

  if (index === -1) {
    const assessment = {};
    assessment[PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.ASSESSMENT_CODE] = assessmentCode;
    assessment[key] = value;
    assessments.push(assessment);
  } else {
    assessments[index][key] = value;
  }

  setLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL, assessments);
};

export const removeFromLocalStorageAssessmentData = (assessmentCode, key) => {
  if (typeof assessmentCode !== "string") {
    throw new Error('Assessment LocalStorage get error. assessmentCode must be of type string');
  }
  if (typeof key !== "string") {
    throw new Error('Assessment LocalStorage get error. key must be of type string');
  }
  if (!assessmentCode) {
    throw new Error('Assessment LocalStorage get error. Empty assessmentCode provided');
  }
  if (!key) {
    throw new Error('Assessment LocalStorage get error. Empty key provided');
  }

  const assessments = getLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL) || [];
  const index = assessments
    .map(assessmentData => assessmentData[PARTICIPANT_ASSESSMENTS_LOCAL_KEYS.ASSESSMENT_CODE])
    .indexOf(assessmentCode);

  if (index !== -1) {
    delete assessments[index][key];
  }

  setLocalStorage(STORAGE_KEYS.PARTICIPANT_ASSESSMENTS_LOCAL, assessments);
};
