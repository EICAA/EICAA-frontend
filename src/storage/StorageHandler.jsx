import { useContext, useEffect } from 'react';
import { AppContext } from './context';
import { REDUCER_TYPES } from './reducers/utils';
import { handleTokenStorage, handleUserStorage } from '../utils/helpers';

const StorageHandler = () => {
  const [{ token = '', user = null, error = {}, isSet = false }, dispatch] = useContext(AppContext);

  useEffect(() => {
    const localToken = handleTokenStorage.get();
    if (error && error.code && (error.code === 401 || error.code === 403)) {
      handleTokenStorage.remove();
      handleUserStorage.remove();
      dispatch({ type: REDUCER_TYPES.NULL_TOKEN });
    }
    if (localToken && !token) {
      dispatch({
        type: REDUCER_TYPES.SET_TOKEN,
        token: localToken,
      });
    }
  }, [token, error, isSet, dispatch]);

  useEffect(() => {
    const localUser = handleUserStorage.get();
    if (localUser && !user) {
      dispatch({
        type: REDUCER_TYPES.SET_USER,
        user: localUser,
      });
    }
  }, [user, dispatch]);

  return null;
}

export default StorageHandler;
