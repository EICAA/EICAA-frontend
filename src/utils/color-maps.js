import colors from './colors';
import { CDK_TYPES } from './constants';

export const ASSESSMENT_TYPE_COLOR_MAP = [
  {
    name: CDK_TYPES.STUDENT,
    color: colors.wheelGreen,
  },
  {
    name: CDK_TYPES.EMPLOYEE,
    color: colors.wheelBlue,
  },
];

export const CDK_TYPE_COLOR_MAP = ASSESSMENT_TYPE_COLOR_MAP;

export const COLOR_BY_AREA_ID = {
  1: colors.wheelBlue,
  2: colors.wheelOrange,
  3: colors.wheelGreen,
};

// TODO Replace to COLOR_BY_AREA_ID where applicable
export const AREA_COLOR_MAP = [
  {
    name: 'Ideas and Opportunities',
    color: colors.wheelBlue,
  },
  {
    name: 'Resources',
    color: colors.wheelOrange,
  },
  {
    name: 'Into Action',
    color: colors.wheelGreen,
  },
];

// TODO Just use COLOR_BY_AREA_ID where applicable
export const COMPETENCE_COLOR_MAP = [
  {
    name: 'Spotting opportunities',
    color: colors.wheelBlue,
  },
  {
    name: 'Spotting Opportunities',
    color: colors.wheelBlue,
  },
  {
    name: 'Design orientation',
    color: colors.wheelBlue,
  },
  {
    name: 'Design Orientation',
    color: colors.wheelBlue,
  },
  {
    name: 'Creativity',
    color: colors.wheelBlue,
  },
  {
    name: 'Vision',
    color: colors.wheelBlue,
  },
  {
    name: 'Valuing ideas',
    color: colors.wheelBlue,
  },
  {
    name: 'Valuing Ideas',
    color: colors.wheelBlue,
  },
  {
    name: 'Ethical and sustainable thinking',
    color: colors.wheelBlue,
  },
  {
    name: 'Ethical and Sustainable Thinking',
    color: colors.wheelBlue,
  },
  {
    name: 'Self-awareness and self-efficacy',
    color: colors.wheelOrange,
  },
  {
    name: 'Self-Awareness and Self-Efficacy',
    color: colors.wheelOrange,
  },
  {
    name: 'Motivation and perseverance',
    color: colors.wheelOrange,
  },
  {
    name: 'Motivation and Perseverance',
    color: colors.wheelOrange,
  },
  {
    name: 'Financial Resources',
    color: colors.wheelOrange,
  },
  {
    name: 'Enterprising literacy',
    color: colors.wheelOrange,
  },
  {
    name: 'Enterprising Literacy',
    color: colors.wheelOrange,
  },
  {
    name: 'Mobilising others',
    color: colors.wheelOrange,
  },
  {
    name: 'Mobilising Others',
    color: colors.wheelOrange,
  },
  {
    name: 'Mobilising resources',
    color: colors.wheelOrange,
  },
  {
    name: 'Mobilising Resources',
    color: colors.wheelOrange,
  },
  {
    name: 'Digital Literacy or Digital skills',
    color: colors.wheelOrange,
  },
  {
    name: 'Digital competence',
    color: colors.wheelOrange,
  },
  {
    name: 'Digital Competence',
    color: colors.wheelOrange,
  },
  {
    name: 'Taking the initiative',
    color: colors.wheelGreen,
  },
  {
    name: 'Taking the Initiative',
    color: colors.wheelGreen,
  },
  {
    name: 'Planning and management',
    color: colors.wheelGreen,
  },
  {
    name: 'Planning and Management',
    color: colors.wheelGreen,
  },
  {
    name: 'Process Management',
    color: colors.wheelGreen,
  },
  {
    name: 'Coping with uncertainty, ambiguity and risk',
    color: colors.wheelGreen,
  },
  {
    name: 'Coping With Uncertainty, Ambiguity and Risk',
    color: colors.wheelGreen,
  },
  {
    name: 'Coping With Uncertainty, Ambiguity, and Risk',
    color: colors.wheelGreen,
  },
  {
    name: 'Design validation',
    color: colors.wheelGreen,
  },
  {
    name: 'Design Validation',
    color: colors.wheelGreen,
  },
  {
    name: 'Working with others',
    color: colors.wheelGreen,
  },
  {
    name: 'Working With Others',
    color: colors.wheelGreen,
  },
  {
    name: 'Learning through experience',
    color: colors.wheelGreen,
  },
  {
    name: 'Learning Through Experience',
    color: colors.wheelGreen,
  },
];

export const DIFFICULTY_COLOR_MAP = [
  {
    name: 'basic',
    color: '#4ACE12',
  },
  {
    name: 'intermediate',
    color: '#5CB1DB',
  },
  {
    name: 'advanced',
    color: '#C05CDB',
  },
];
