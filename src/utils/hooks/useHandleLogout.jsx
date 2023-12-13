import React from 'react';
import { useNavigate } from 'react-router';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';
import { STORAGE_KEYS } from '../../storage/storageHandlers/config';
import { removeFromLocalStorage } from '../../storage/storageHandlers/operations';
import { PATHS } from '../constants';
import { handleTokenStorage, handleUserStorage } from '../helpers';

export const useHandleLogout = () => {
  const [, dispatch] = React.useContext(AppContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    handleTokenStorage.remove();
    handleUserStorage.remove();
    removeFromLocalStorage(STORAGE_KEYS.REMEMBER_LOGIN);
  
    dispatch({ type: REDUCER_TYPES.NULL_TOKEN });
    dispatch({ type: REDUCER_TYPES.NULL_USER });
  
    navigate(`${PATHS.user}${PATHS.login}`);
  };

  return handleLogout;
};