import React from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';
import { objectGet } from '../lib/youmightnotneed-lodash';

export const useShowErrorModal = () => {
  const [, dispatch] = React.useContext(AppContext);

  const intl = useIntl();

  const show = React.useCallback(err => {
    let errorMessage;
    const defaultErrorMessage = intl.messages.apiErrors?.messageDefault;
  
    if (err.response?.data?.messageKey) {
      const apiErrorMessage = objectGet(intl.messages.apiErrors, err.response.data.messageKey);
  
      if (apiErrorMessage) {
        errorMessage = apiErrorMessage;
      } else {
        errorMessage = defaultErrorMessage;
      }
    } else {
      errorMessage = defaultErrorMessage;
    }
  
    dispatch({
      type: REDUCER_TYPES.SET_ERROR_MODAL,
      errorModal: {
        intlMessages: intl.messages,
        message: errorMessage,
      },
    });
  
    console.error(err);
  }, [dispatch, intl.messages]);

  return show;
};
