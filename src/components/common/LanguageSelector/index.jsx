import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { LANGUAGES } from '../../../utils/constants';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import { STORAGE_KEYS } from '../../../storage/storageHandlers/config';
import { getLocalStorage, setLocalStorage } from '../../../storage/storageHandlers/operations';
import LanguageItem from '../ui/LanguageItem';
import './index.scss';

const LanguageSelector = () => {
  const [{ selectedLanguage = getLocalStorage(STORAGE_KEYS.LANGUAGE) }, dispatch] = React.useContext(AppContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const selectLanguage = lang => {
    if (!lang) {
      return;
    }
    if (lang !== selectedLanguage) {
      setLocalStorage(STORAGE_KEYS.LANGUAGE, lang);
      dispatch({ type: REDUCER_TYPES.SET_SELECTED_LANGUAGE, selected: lang });
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={classnames(
        'language-selector',
        isOpen && '-open',
      )}>
        <div
          className="language-selector__current-language"
          onClick={() => setIsOpen(!isOpen)}
        >
          <LanguageItem languageCode={selectedLanguage} />
        </div>
        <div className={classnames(
          'language-selector__menu',
          !isOpen && '-hidden',
        )}>
          {Object.keys(LANGUAGES)
            .filter(language => LANGUAGES[language] !== selectedLanguage)
            .map(language => {
              const languageCode = LANGUAGES[language];
              return (
                <div
                  key={languageCode}
                  className="language-selector__menu-item"
                  onClick={() => selectLanguage(languageCode)}
                >
                  <LanguageItem languageCode={languageCode} />
                </div>
              );
            })}
        </div>
      </div>
      <div
        className={classnames(
          'language-selector__backdrop',
          !isOpen && '-hidden',
        )}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default LanguageSelector;
