import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import Button from '../ui/Buttons/Button';
import './index.scss';

const ErrorModal = () => {
  const [{ errorModal }, dispatch] = React.useContext(AppContext);

  const intlMessages = errorModal?.intlMessages;

  const closeModal = () => {
    dispatch({
      type: REDUCER_TYPES.NULL_ERROR_MODAL,
    });
  };

  return (
    <div className={classnames(
      'error-modal',
      !errorModal?.title && !errorModal?.message && '-hidden',
    )}>
      <div className="error-modal__container">
        <div className="error-modal__backdrop"></div>
        <div className="error-modal__content">
          <h2 className="error-modal__title">{errorModal?.title || intlMessages?.apiErrors?.titleDefault}</h2>
          <div className="error-modal__message-container">
            <p className="error-modal__message">{errorModal?.message || intlMessages?.apiErrors?.messageDefault}</p>
          </div>
          <div className="error-modal__button-container">
            <Button
              className="error-modal__button -red"
              label={intlMessages?.common?.ok}
              handleClick={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
