import { DATA_TYPES } from '../../utils/constants';

export const STORAGE_KEYS = {
  DRY_RUN_REDIRECT: 'dryRunRedirect',
  LANGUAGE: 'language',
  TOKEN: 'token',
  USER: 'user',
  PARTICIPANT_ASSESSMENTS: 'participantAssessments',
  PARTICIPANT_ASSESSMENTS_LOCAL: 'participantAssessmentsLocal',
  REMEMBER_LOGIN: 'rememberLogin',
};

export const STORAGE_SCHEMA = {
  dryRunRedirect: DATA_TYPES.STRING,
  language: DATA_TYPES.STRING,
  token: DATA_TYPES.STRING,
  user: DATA_TYPES.OBJECT,
  participantAssessments: DATA_TYPES.ARRAY,
  participantAssessmentsLocal: DATA_TYPES.ARRAY,
  rememberLogin: DATA_TYPES.BOOLEAN,
};

export const PARTICIPANT_ASSESSMENT_KEYS = {
  ASSESSMENT_CODE: 'assessmentCode',
  SURVEY_METADATA: 'surveyMetadata',
  LANDING_FORM_DATA: 'landingFormData',
  DEMOGRAPHICS_FORM_DATA: 'demographicsFormData',
  SELECTED_LANGUAGE: 'selectedLanguage',
  ASSESSMENT_QUESTIONS: 'assessmentQuestions',
  ASSESSMENT_ANSWERS: 'assessmentAnswers',
  SURVEY_DATA: 'surveyData',
  SURVEY_RESPONSE: 'surveyResponse',
  ASSESSMENT_START: 'assessmentStart',
  ASSESSMENT_END: 'assessmentEnd',
};

export const PARTICIPANT_ASSESSMENTS_LOCAL_KEYS = {
  ASSESSMENT_CODE: 'assessmentCode',
  DURATION_SECONDS: 'assessmentDurationSeconds',
};
