import cdkEmployeeJson from '../assets/data/cdk/employee/eicaa_cdk_employee_v6.json';
import cdkStudentJson from '../assets/data/cdk/student/eicaa_cdk_student_v6.json';

export const API_BASE_URL = process.env.REACT_APP_URL;
export const API_URL = `${API_BASE_URL}`;
export const EICAA_URL = 'https://www.eicaa.eu/';
// export const EICAA_PP_URL = 'https://www.eicaa.eu/privacy-policy/'; - old link

export const TOKEN = 'token';
export const USER = 'user';
export const USERNAME = 'username';
export const STORAGE = 'storage';
export const NO_SERVER = 'Could not reach server';
export const LANGUAGE = 'language';
export const LARGE = 'large';

export const LIMITS = {
  MAX_UINT4: 4294967295,
  MAX_INT4: 2147483647,
  CHAR: 255,
  TEXT: 32767,
};

export const CDK_DATA = {
  STUDENT: cdkStudentJson,
  EMPLOYEE: cdkEmployeeJson,
};

export const LANGUAGES = {
  EN: 'en',
  DE: 'de',
  NL: 'nl',
  ES: 'es',
  FR: 'fr',
  HU: 'hu',
  CA: 'ca',
};

export const DATE_LOCALE_PLACEHOLDERS = {
  DAY: {
    en: 'DD',
    de: 'TT',
    nl: 'DD',
    es: 'DD',
    fr: 'JJ',
    hu: 'NN',
  },
  MONTH: {
    en: 'MM',
    de: 'MM',
    nl: 'MM',
    es: 'MM',
    fr: 'MM',
    hu: 'HH',
  },
  YEAR: {
    en: 'YYYY',
    de: 'JJJJ',
    nl: 'JJJJ',
    es: 'AAAA',
    fr: 'AAAA',
    hu: 'ÉÉÉÉ',
  },
};

export const ERROR_OCCURRED = {
  en: 'An error occurred<br />Please retry or reload the page',
};

export const PATHS = {
  start: '/start',
  demographics: '/demographics',
  assessment: '/assessment',
  finish: '/finish',
  privacyPolicy: '/privacy-policy',
  frequentlyAsked: '/faq',
  pageNotAvailable: '/page-not-available',
  user: '/user',
  root: '/',
  register: '/register',
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  account: '/account',
  assessments: '/assessments',
  create: '/create',
  archivedAssessments: '/archived-assessments',
  cdkRepository: '/cdk-repository',
  CDK_REPOSITORY: {
    type: 'type',
    list: 'list',
  },
  cdkModules: '/cdk-modules',
  CDK_MODULES: {
    overview: 'overview',
    manual: 'manual',
    resources: 'resources',
    scope: 'scope',
    assessment: 'assessment',
    author: 'author',
    rating: 'rating',
  },
  support: '/support',
  pageNotFound: '/page-not-found',
  params: {
    assessmentId: '/:assessmentId',
    cdkRepositoryType: '/:cdkRepositoryType',
    cdkId: '/:cdkId',
  },
  qrCode: '/qrcode',
};

export const DATA_TYPES = {
  BOOLEAN: 'boolean',
  STRING: 'string',
  NUMBER: 'number',
  ARRAY: 'array',
  OBJECT: 'object',
};

export const ASSESSMENT_TYPES = {
  EMPLOYEE: 'employee',
  STUDENT: 'student',
};

export const CDK_TYPES = ASSESSMENT_TYPES;

export const QUERY_PARAM_KEYS = {
  ASSESSMENT: 'assessment',
  DRY_RUN: 'dryRun',
  RESULT_TOKEN: 'resultToken',
  SHARE_RESULTS: 'shareResults',
  TOKEN: 'token',
};

export const ROLES = {
  EDUCATOR: 'Educator',
  MANAGER: 'Manager',
};

export const MENU_BAR_ITEMS = {
  HOME: {
    id: 1,
    labelKey: 'home',
    iconName: 'home',
    activePath: `${PATHS.user}${PATHS.dashboard}`,
    redirectTo: `${PATHS.user}${PATHS.dashboard}`,
    isProtected: true,
  },
  ASSESSMENTS: {
    id: 2,
    labelKey: 'assessments',
    iconName: 'checkedList',
    activePath: `${PATHS.user}${PATHS.assessments}`,
    redirectTo: `${PATHS.user}${PATHS.assessments}`,
    isProtected: true,
  },
  ARCHIVED_ASSESSMENTS: {
    id: 3,
    labelKey: 'archivedAssessments',
    iconName: 'archive',
    activePath: `${PATHS.user}${PATHS.archivedAssessments}`,
    redirectTo: `${PATHS.user}${PATHS.archivedAssessments}`,
    isProtected: true,
  },
  INTERVENTION_REPOSITORY: {
    id: 4,
    labelKey: 'cdkRepository',
    iconName: 'lightBulb',
    activePaths: [`${PATHS.user}${PATHS.cdkRepository}`, `${PATHS.user}${PATHS.cdkModules}`],
    redirectTo: `${PATHS.user}${PATHS.cdkRepository}/${PATHS.CDK_REPOSITORY.type}`,
    isProtected: false,
  },
  /* Not in this version
  SUPPORT: {
    id: 5,
    labelKey: 'support',
    iconName: 'questionMark',
    activePath: `${PATHS.user}${PATHS.support}`,
    redirectTo: `${PATHS.user}${PATHS.support}`,
    isProtected: true,
  },*/
};

export const ASSESSMENT_LIST_TYPES = {
  LIVE: 'live',
  ARCHIVED: 'archived',
};

export const BOOLEANS_AS_STRING = {
  TRUE: 'true',
  FALSE: 'false',
};

export const ASSESSMENT_SUMMARY_TYPES = {
  CREATED: 'created',
  OVERVIEW: 'overview',
};

export const LAYOUTS = {
  ROW: 'row',
  COLUMN: 'column',
};

export const BORDER_RADIUS_TYPES = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
  TOP_LEFT_CROSS: 'top-left-cross',
  TOP_RIGHT_CROSS: 'top-right-cross',
};

export const CDK_CARD_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  IMAGE_AND_TEXT: 'image-and-text',
  IMAGE_AND_VIDEO: 'image-and-video',
};

export const CDK_RATING_CARD_TYPES = {
  SUMMARY: 'summary',
  RATING: 'rating',
};

export const EXTENDED_CHECKBOX_STATUSES = {
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  PARTIAL: 'partial',
};

export const ASSESSMENTS_FILTER_REDUCER_TYPES = {
  INITIALIZE: 'initialize',
  CHECK: 'check',
  UNCHECK: 'uncheck',
  PARTIAL: 'partial',
};

export const ResultFields = {
  DEMOGRAPHY: {
    employee: [
      'country',
      'educationLevel',
      'workExperience',
      'workField',
      'organisationType',
      'organisationSize',
      'levelOfPosition',
    ],
    student: [
      'country',
      'educationLevel',
      'majorField',
      'hasWorkExperience',
      'workExperience',
      'employmentStatus',
      'employmentType',
    ],
  },
  DEMOGRAPHY_SENSITIVE: ['gender', 'ageGroup', 'educationLevel'],
};
