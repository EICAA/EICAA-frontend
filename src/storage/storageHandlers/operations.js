import { get, set, del, clear } from 'idb-keyval';
import { DATA_TYPES } from '../../utils/constants';
import { STORAGE_SCHEMA } from './config';

export const setLocalStorage = (key, value) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (typeof value === DATA_TYPES.OBJECT) {
    if (value instanceof Array && dataType !== DATA_TYPES.ARRAY) {
      throw new Error(`Incorrect value type. Array was expected.`);
    }
    if (value instanceof Object && !(value instanceof Array) && dataType !== DATA_TYPES.OBJECT) {
      throw new Error(`Incorrect value type. Object was expected.`);
    }
  } else if (typeof value !== dataType) {
    throw new Error(`Incorrect value type. ${dataType} was expected, ${typeof value} was provided.`);
  }
  
  if (typeof value === DATA_TYPES.OBJECT) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (dataType === DATA_TYPES.STRING) {
    return localStorage.getItem(key);
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const removeFromLocalStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const setSessionStorage = (key, value) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (typeof value === DATA_TYPES.OBJECT) {
    if (value instanceof Array && dataType !== DATA_TYPES.ARRAY) {
      throw new Error(`Incorrect value type. Array was expected.`);
    }
    if (value instanceof Object && !(value instanceof Array) && dataType !== DATA_TYPES.OBJECT) {
      throw new Error(`Incorrect value type. Object was expected.`);
    }
  } else if (typeof value !== dataType) {
    throw new Error(`Incorrect value type. ${dataType} was expected, ${typeof value} was provided.`);
  }
  
  if (typeof value === DATA_TYPES.OBJECT) {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
};

export const getSessionStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  const dataType = STORAGE_SCHEMA[key];

  if (dataType === DATA_TYPES.STRING) {
    return sessionStorage.getItem(key);
  } else {
    return JSON.parse(sessionStorage.getItem(key));
  }
};

export const removeFromSessionStorage = key => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};

export const setIdb = async (key, value) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  return await set(key, value);
};

export const getIdb = async (key) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  return await get(key);
};

export const removeFromIdb = async (key) => {
  if (!Object.keys(STORAGE_SCHEMA).some(storageKey => key === storageKey)) {
    throw new Error(`Undefined storage key ${key}. Define this key in STORAGE_KEYS and STORAGE_SCHEMA`);
  }

  return await del(key);
};

export const clearIdb = async () => {
  return await clear();
};
