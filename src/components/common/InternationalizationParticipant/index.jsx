import React from 'react';
import { Outlet } from 'react-router';
import { IntlProvider } from 'react-intl';
import { AppContext } from '../../../storage/context';
import { LANGUAGES } from '../../../utils/constants';
import { PARTICIPANT_ASSESSMENT_KEYS } from '../../../storage/storageHandlers/config';
import { useIdbStorageAssessment } from '../../../storage/storageHandlers/hooks';
import en from '../../../i18n/en.json';
import de from '../../../i18n/de.json';
import nl from '../../../i18n/nl.json';
import es from '../../../i18n/es.json';
import fr from '../../../i18n/fr.json';
import hu from '../../../i18n/hu.json';
import ca from '../../../i18n/ca.json';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';

const InternationalizationParticipant = () => {
  const [{ selectedParticipantLanguage }, dispatch] = React.useContext(AppContext);

  const [messages, setMessages] = React.useState();

  const idbStorageAssessment = useIdbStorageAssessment();

  const selectParticipantLanguage = React.useCallback(
    async (language) => {
      return await idbStorageAssessment.getData(language);
    },
    [idbStorageAssessment],
  );

  React.useEffect(() => {
    const createMessages = async () => {
      let selectedMessages;
      
      const selectedLanguage =
        selectedParticipantLanguage ||
        (await selectParticipantLanguage(PARTICIPANT_ASSESSMENT_KEYS.SELECTED_LANGUAGE));
  
      switch (selectedLanguage) {
        case LANGUAGES.EN:
          selectedMessages = en;
          break;
        case LANGUAGES.DE:
          selectedMessages = de;
          break;
        case LANGUAGES.NL:
          selectedMessages = nl;
          break;
        case LANGUAGES.ES:
          selectedMessages = es;
          break;
        case LANGUAGES.FR:
          selectedMessages = fr;
          break;
        case LANGUAGES.HU:
          selectedMessages = hu;
          break;
        case LANGUAGES.CA:
          selectedMessages = ca;
          break;
        default:
          selectedMessages = en;
          break;
      }

      setMessages(selectedMessages);
    
      dispatch({
        type: REDUCER_TYPES.SET_SELECTED_PARTICIPANT_LANGUAGE,
        selectedParticipantLanguage: selectedLanguage,
      });
      
      await idbStorageAssessment.setData(
        PARTICIPANT_ASSESSMENT_KEYS.SELECTED_LANGUAGE,
        selectedLanguage,
      );
    };

    createMessages();
  }, [selectedParticipantLanguage, dispatch, idbStorageAssessment, selectParticipantLanguage]);

  return (
    <IntlProvider locale={selectedParticipantLanguage} messages={messages || {}} onError={() => {}}>
      <Outlet />
    </IntlProvider>
  );
};

export default InternationalizationParticipant;
