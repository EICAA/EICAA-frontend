import React from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';

export const useShowStorageErrorModal = () => {
  const [, dispatch] = React.useContext(AppContext);

  const intl = useIntl();

  const show = React.useCallback(err => {
    dispatch({
      type: REDUCER_TYPES.SET_ERROR_MODAL,
      errorModal: {
        intlMessages: intl.messages,
        message: intl.messages.apiErrors?.storageError,
      },
    });
    console.error(err);
  }, [dispatch, intl.messages]);

  return show;
};
