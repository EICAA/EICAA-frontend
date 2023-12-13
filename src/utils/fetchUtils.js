import { STORAGE_KEYS } from '../storage/storageHandlers/config';
import { getLocalStorage } from '../storage/storageHandlers/operations';
import { ERROR_OCCURRED, LANGUAGES } from './constants';
import { handleTokenStorage, handleUserStorage } from './helpers';

export const handleErrorSet = (error = {}, setError = () => { }, translatedMessage = null) => {
  const currentLanguage = getLocalStorage(STORAGE_KEYS.LANGUAGE) || LANGUAGES.EN;

  const text = translatedMessage || ERROR_OCCURRED[currentLanguage];
  const code = error?.response?.status || 400;
  if(code === 401) {
    handleTokenStorage.remove();
    handleUserStorage.remove();
  }
  return setError({ text, code });
};
