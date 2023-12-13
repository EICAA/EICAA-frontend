import React from 'react';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';

export const useLoadingLayer = () => {
  const [, dispatch] = React.useContext(AppContext);

  const show = React.useCallback(() => {
    dispatch({
      type: REDUCER_TYPES.SET_IS_LOADING,
      isLoading: true,
    });
  }, [dispatch]);
  
  const hide = React.useCallback(() => {
    dispatch({
      type: REDUCER_TYPES.SET_IS_LOADING,
      isLoading: false,
    });
  }, [dispatch]);

  return React.useMemo(() => (
    { show, hide }
  ), [show, hide]);
};
