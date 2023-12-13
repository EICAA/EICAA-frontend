import React from 'react';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';

const useSnackBar = () => {
  const dispatch = React.useContext(AppContext)[1];

  const close = React.useCallback(() => {
    dispatch({ type: REDUCER_TYPES.NULL_SNACK_BAR_DATA });
  }, [dispatch]);

  const open = React.useCallback((message, options) => {
    dispatch({
      type: REDUCER_TYPES.SET_SNACK_BAR_DATA,
      snackBarData: {
        message,
        options,
      },
    });
  }, [dispatch]);

  return React.useMemo(() => (
    { open, close }
  ), [open, close]);
};

export default useSnackBar;
