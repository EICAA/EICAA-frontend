import { STORAGE_KEYS } from '../storage/storageHandlers/config';
import {
  getLocalStorage,
  getSessionStorage,
  removeFromLocalStorage,
  removeFromSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from '../storage/storageHandlers/operations';
import { ASSESSMENT_TYPES, BOOLEANS_AS_STRING } from './constants';

export const preventDefaultEventIfNotLink = (event) => {
  let preventAction = true;

  const { target } = event;

  if (target.tagName.toLowerCase() === 'a') {
    preventAction = false;
  } else {
    const { parentElement } = target;

    if (parentElement.tagName.toLowerCase() === 'a') {
      preventAction = false;
    }
  }

  if (preventAction) {
    event.preventDefault();
  }
};

export const getAssessmentIdentifier = (assessmentCode) => {
  if (typeof assessmentCode !== 'string') {
    throw new Error('Error: assessmentCode must be of type string.');
  }

  return assessmentCode;
};

export const lowerCaseInitial = (str) => {
  let initial = str[0].toLowerCase();

  return `${initial}${str.slice(1)}`;
};

export const getEditorConfig = (intl, assessmentType) => {
  switch (assessmentType) {
    case ASSESSMENT_TYPES.EMPLOYEE:
      return {
        title: intl.messages.user?.assessmentCreatePage.businessAssessment,
        topColor: 'turquoise-lighter',
      };
    case ASSESSMENT_TYPES.STUDENT:
      return {
        title: intl.messages.user?.assessmentCreatePage.educationAssessment,
        topColor: 'green',
      };
    default:
      return {};
  }
};

export const getSummaryConfig = (intl, assessmentType, summaryType) => {
  switch (assessmentType) {
    case ASSESSMENT_TYPES.EMPLOYEE:
      return {
        type: summaryType,
        subTitle: intl.messages.common?.employees,
        topColor: 'turquoise-lighter',
        subTitleBackgroundColor: 'primary-lightest',
      };
    case ASSESSMENT_TYPES.STUDENT:
      return {
        type: summaryType,
        subTitle: intl.messages.common?.students,
        topColor: 'green',
        subTitleBackgroundColor: 'secondary-dark',
      };
    default:
      return {};
  }
};

export const convertBooleanStringToBoolean = (booleanString) => {
  if (!booleanString || typeof booleanString !== 'string') {
    return null;
  }

  if (booleanString.toLowerCase() === BOOLEANS_AS_STRING.TRUE) {
    return true;
  }
  if (booleanString.toLowerCase() === BOOLEANS_AS_STRING.FALSE) {
    return false;
  }
};

export const formatDate = (ISODate) => {
  if (!ISODate) {
    return '';
  }

  const date = new Date(ISODate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const handleTokenStorage = {
  set: (token, rememberMe) => {
    if (rememberMe) {
      setLocalStorage(STORAGE_KEYS.TOKEN, token);
    } else {
      setSessionStorage(STORAGE_KEYS.TOKEN, token);
    }
  },
  get: () => {
    const sessionToken = getSessionStorage(STORAGE_KEYS.TOKEN);
    const localToken = getLocalStorage(STORAGE_KEYS.TOKEN);

    return sessionToken || localToken;
  },
  remove: () => {
    removeFromSessionStorage(STORAGE_KEYS.TOKEN);
    removeFromLocalStorage(STORAGE_KEYS.TOKEN);
  },
};

export const handleUserStorage = {
  set: (user, rememberMe) => {
    if (rememberMe) {
      setLocalStorage(STORAGE_KEYS.USER, user);
    } else {
      setSessionStorage(STORAGE_KEYS.USER, user);
    }
  },
  get: () => {
    const sessionUser = getSessionStorage(STORAGE_KEYS.USER);
    const localUser = getLocalStorage(STORAGE_KEYS.USER);

    return sessionUser || localUser;
  },
  remove: () => {
    removeFromSessionStorage(STORAGE_KEYS.USER);
    removeFromLocalStorage(STORAGE_KEYS.USER);
  },
};

export const capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

export const generateLabelFromSlug = (slug) => {
  if (!slug) {
    return '';
  }

  const lowerCaseWords = ['and', 'or', 'with', 'through'];
  const persistHyphenSuffixWords = ['self', 'co'];

  const words = slug.split('-');

  return words
    .map((word, i, array) => {
      let labelWord = word;

      if (!lowerCaseWords.includes(word)) {
        labelWord = capitalize(labelWord);
      }

      if (persistHyphenSuffixWords.includes(word)) {
        labelWord = `${labelWord}-`;
      }

      if (i === 0) {
        labelWord = capitalize(labelWord);
        // if it's not the first word and the word before ends in '-' then word should be lower case
      } else if (persistHyphenSuffixWords.includes(array[i - 1])) {
        labelWord = labelWord.toLowerCase();
      }

      return labelWord;
    })
    .reduce((acc, curr) => {
      if (acc === '' || acc[acc.length - 1] === '-') {
        return `${acc}${curr}`;
      }

      return `${acc} ${curr}`;
    }, '');
};

export const addDecimalAlphaToHexColor = (colorHex, opacityDecimal = 1) => {
  // coerce values so it is between 0 and 1.
  const opacityHexNumber = Math.round(Math.min(Math.max(opacityDecimal || 0, 0), 1) * 255);
  const opacityHex = opacityHexNumber.toString(16).padStart(2, '0').toUpperCase();

  return colorHex + opacityHex;
};

export const generateColorByText = (colorMap, text = '', options = {}) => {
  if (!(colorMap instanceof Array)) {
    return;
  }

  const { alpha } = options;

  let color = colorMap.find((item) => item.name === text)?.color;

  if (
    color !== undefined &&
    alpha !== undefined &&
    alpha !== null &&
    typeof alpha === 'number' &&
    alpha >= 0 &&
    alpha <= 1
  ) {
    color = addDecimalAlphaToHexColor(color, alpha);
  }

  return color;
};

export const containsRegExp = (text, regExp) => {
  return regExp.test(text);
};

export const splitByRegExp = (text, regExp) => {
  return text.split(regExp);
};

export const removeStartingAndTrailingStrings = (text, stringsToRemove) => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let newText = text;
  let hadStringsToRemove = false;

  for (const str of stringsToRemove) {
    const textArr = newText.split(str);

    if (textArr[0] === '') {
      textArr.splice(0, 1);
      hadStringsToRemove = true;
    }

    if (textArr[textArr.length - 1] === '') {
      textArr.splice(textArr.length - 1, 1);
      hadStringsToRemove = true;
    }

    newText = textArr.join(str);
  }

  if (!hadStringsToRemove) {
    return newText;
  } else {
    return removeStartingAndTrailingStrings(newText, stringsToRemove);
  }
};

export const imageRegExp = /(#{2}.*#{2})/;

export const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const formatRawText = (rawText) => {
  if (rawText instanceof Array) return rawText;

  const stringsToRemove = [' ', '\n'];

  if (containsRegExp(rawText, imageRegExp) && containsRegExp(rawText, urlRegExp)) {
    const newTextArr = splitByRegExp(rawText, imageRegExp).map((text) =>
      removeStartingAndTrailingStrings(text, stringsToRemove),
    );
    return newTextArr.map((text) => splitByRegExp(text, urlRegExp)).flat();
  }

  if (containsRegExp(rawText, imageRegExp)) {
    const newTextArr = splitByRegExp(rawText, imageRegExp);
    return newTextArr.map((text) => removeStartingAndTrailingStrings(text, stringsToRemove));
  }

  if (containsRegExp(rawText, urlRegExp)) {
    const newTextArr = removeStartingAndTrailingStrings(rawText, stringsToRemove);
    return splitByRegExp(newTextArr, urlRegExp);
  }

  return removeStartingAndTrailingStrings(rawText, stringsToRemove);
};
