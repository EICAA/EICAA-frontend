import React from 'react';
import { Outlet } from 'react-router';
import { IntlProvider } from 'react-intl';
import { AppContext } from '../../../storage/context';
import { LANGUAGES } from '../../../utils/constants';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import { STORAGE_KEYS } from '../../../storage/storageHandlers/config';
import { getLocalStorage, setLocalStorage } from '../../../storage/storageHandlers/operations';
import en from '../../../i18n/en.json';
import de from '../../../i18n/de.json';
import nl from '../../../i18n/nl.json';
import es from '../../../i18n/es.json';
import fr from '../../../i18n/fr.json';
import hu from '../../../i18n/hu.json';
import ca from '../../../i18n/ca.json';

const Internationalization = () => {
  const [{ selectedLanguage = getLocalStorage(STORAGE_KEYS.LANGUAGE) }, dispatch] = React.useContext(AppContext);

  const [messages, setMessages] = React.useState();

  const createMessages = React.useCallback(() => {
    let messages;

    switch(selectedLanguage) {
      case LANGUAGES.EN:
        messages = en;
        break;
      case LANGUAGES.DE:
        messages = de;
        break;
      case LANGUAGES.NL:
        messages = nl;
        break;
      case LANGUAGES.ES:
        messages = es;
        break;
      case LANGUAGES.FR:
        messages = fr;
        break;
      case LANGUAGES.HU:
        messages = hu;
        break;
      case LANGUAGES.CA:
        messages = ca;
        break;
      default:
        messages = en;
        dispatch({
          type: REDUCER_TYPES.SET_SELECTED_LANGUAGE,
          selectedLanguage: LANGUAGES.EN,
        });
        setLocalStorage(STORAGE_KEYS.LANGUAGE, LANGUAGES.EN);
        break;
    };
    setMessages(messages);
  }, [selectedLanguage, dispatch]);

  React.useEffect(() => {
    createMessages();
  }, [createMessages]);

  return (
    <IntlProvider locale={selectedLanguage} messages={messages} onError={() => { }}>
      <Outlet />
    </IntlProvider>
  );
};

export default Internationalization;
