import { API_URL, PATHS } from '../../../../utils/constants';
import { generateColorByText } from '../../../../utils/helpers';
import {
  CDK_TYPE_COLOR_MAP,
  AREA_COLOR_MAP,
  COMPETENCE_COLOR_MAP,
} from '../../../../utils/color-maps';

const { user, cdkModules, CDK_MODULES } = PATHS;

export const TABS = [
  {
    labelKey: 'overview',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.overview}`,
  },
  {
    labelKey: 'manual',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.manual}`,
  },
  {
    labelKey: 'resources',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.resources}`,
  },
  {
    labelKey: 'scope',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.scope}`,
  },
  {
    labelKey: 'assessment',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.assessment}`,
  },
  {
    labelKey: 'author',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.author}`,
  },
  {
    labelKey: 'rating',
    getPath: (cdkRepositoryType, cdkId) =>
      `${user}${cdkModules}/${cdkRepositoryType}/${cdkId}/${CDK_MODULES.rating}`,
  },
];

export const getBreadcrumbItems = (cdkRepositoryType, moduleMeta) => {
  return [
    {
      label: cdkRepositoryType,
      color: generateColorByText(CDK_TYPE_COLOR_MAP, cdkRepositoryType, { alpha: 0.4 }),
      isLabelCapital: true,
    },
    {
      label: moduleMeta.area,
      color: generateColorByText(AREA_COLOR_MAP, moduleMeta.area, { alpha: 0.4 }),
    },
    {
      label: moduleMeta.competence,
      color: generateColorByText(COMPETENCE_COLOR_MAP, moduleMeta.competence, { alpha: 0.4 }),
    },
    {
      label: moduleMeta.name,
      color: generateColorByText(CDK_TYPE_COLOR_MAP, cdkRepositoryType, { alpha: 0.4 }),
    },
  ];
};

export const generateDetailsHtml = (details = {}) => {
  return Object.keys(details).reduce((acc, key) => {
    return `${acc}<b>${key}:</b> ${details[key]}\n`;
  }, '');
};

export const getModuleIdInfo = (competenceID) => {
  const [areaId, competenceId, difficulty] = competenceID
    .split('.')
    .map((item) => item.trim().toLowerCase());

  return [areaId, competenceId, difficulty];
};

export const getModuleFolderName = (competenceID) => {
  const [areaId, competenceId] = getModuleIdInfo(competenceID);
  return `${areaId}.${competenceId}`;
};

export const getCdkImageUrl = (moduleFolderName, fileName, isThumbnail) => {
  return `${API_URL}/public/${
    isThumbnail ? 'thumbnails/' : ''
  }pictures/${moduleFolderName}/${fileName}`;
};

export const getCdkResourceUrl = (moduleFolderName, fileName) => {
  return `${API_URL}/public/resources/${moduleFolderName}/${fileName}`;
};
