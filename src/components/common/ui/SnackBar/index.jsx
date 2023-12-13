import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import './index.scss';

const SnackBar = () => {
  const [{ snackBarData }, dispatch] = React.useContext(AppContext);

  const { message, options={} } = snackBarData || {};
  const { duration, color } = options;
  const isHidden = !message;

  const closeSnackBar = React.useCallback(() => {
    dispatch({ type: REDUCER_TYPES.NULL_SNACK_BAR_DATA });
  }, [dispatch]);

  React.useEffect(() => {
    if (snackBarData?.message) {
      setTimeout(closeSnackBar, duration || 4500);
    }
  }, [snackBarData, closeSnackBar, duration]);

  return (
    <div
      className={classnames(
        'snack-bar',
        isHidden && '-hidden',
        color && `-${color}`,
      )}
    >
      <div className="snack-bar__message-container">
        <p className="snack-bar__message">
          {message || ''}
        </p>
      </div>
      <div
        className="snack-bar__button-container"
        onClick={closeSnackBar}
      >
        <div className="snack-bar__button-close" />
      </div>
    </div>
  );
};

export default SnackBar;
