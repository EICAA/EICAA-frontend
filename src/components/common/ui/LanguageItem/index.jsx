import React from 'react';
import { LANGUAGES } from '../../../../utils/constants';
import flagEn from '../../../../assets/icons/flags/en.png';
import flagDe from '../../../../assets/icons/flags/de.png';
import flagNl from '../../../../assets/icons/flags/nl.png';
import flagEs from '../../../../assets/icons/flags/es.png';
import flagFr from '../../../../assets/icons/flags/fr.png';
import flagHu from '../../../../assets/icons/flags/hu.png';
import './index.scss';

const LanguageItem = props => {
  const { languageCode } = props;

  const flagImage = React.useMemo(() => {
    switch(languageCode) {
      case LANGUAGES.EN:
        return flagEn;
      case LANGUAGES.DE:
        return flagDe;
      case LANGUAGES.NL:
        return flagNl;
      case LANGUAGES.ES:
        return flagEs;
      case LANGUAGES.FR:
        return flagFr;
      case LANGUAGES.HU:
        return flagHu;
      default:
        return null;
    }
  }, [languageCode]);

  return (
    <div className="language-item">
      <div className="language-item__code-container">
        <h3 className="language-item__code">
          {languageCode}
        </h3>
      </div>
      <div className="language-item__flag-container">
        <img
          className="language-item__flag"
          src={flagImage}
          alt={languageCode}
        />
      </div>
    </div>
  );
};

export default LanguageItem;
