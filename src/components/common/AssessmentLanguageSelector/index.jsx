import React from 'react';
import { AppContext } from '../../../storage/context';
import { LANGUAGES_DATA } from '../../../utils/languages';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import Button from '../ui/Buttons/Button';
import LanguageButton from '../ui/LanguageButton';
import en from '../../../assets/icons/flags/en.png';
import de from '../../../assets/icons/flags/de.png';
import nl from '../../../assets/icons/flags/nl.png';
import es from '../../../assets/icons/flags/es.png';
import fr from '../../../assets/icons/flags/fr.png';
import hu from '../../../assets/icons/flags/hu.png';
import ca from '../../../assets/icons/flags/ca.png'; 
import './index.scss';

const AssessmentLanguageSelector = props => {
  const dispatch = React.useContext(AppContext)[1];
  const [assessmentLanguage, setAssessmentLanguage] = React.useState(null);
  const { intlMessages, availableLanguages, onLanguageSelected } = props;

  const languageImages = { en, de, nl, es, fr, hu, ca };

  const languageOptions = availableLanguages
    ?.map(lang => (
      LANGUAGES_DATA.find(language => language.alpha2Code === lang)
    ))
    .sort((language1, language2) => language1.id - language2.id);

  const selectLanguage = () => {
    onLanguageSelected(assessmentLanguage);
    dispatch({ type: REDUCER_TYPES.NULL_MODAL_DATA });
  };

  return (
    <div className="assessment-language-selector">
      <div className="assessment-language-selector__language-buttons-container">
        {languageOptions.map(language => (
          <div
            key={language.id}
            className="assessment-language-selector__language-button-container"
          >
            <LanguageButton
              className="assessment-language-selector__language-button"
              imageSrc={languageImages[language.alpha2Code.toLowerCase()]}
              label={language.alpha2Code}
              selected={language.alpha2Code === assessmentLanguage}
              onChange={() => setAssessmentLanguage(language.alpha2Code)}
            />
          </div>
        ))}
      </div>
      <Button
        className="assessment-language-selector__button"
        label={intlMessages?.common?.ok}
        handleClick={selectLanguage}
        disabled={!assessmentLanguage}
      />
    </div>
  );
};

export default AssessmentLanguageSelector;
