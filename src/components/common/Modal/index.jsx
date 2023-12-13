import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import Button from '../ui/Buttons/Button';
import './index.scss';

const Modal = () => {
  const [{ modalData = {} }, dispatch] = React.useContext(AppContext);

  const intlMessages = modalData?.intlMessages || {};
  const hideModal = !modalData?.title && !modalData?.description && !modalData?.component;

  const renderModalDataComponent = () => {
    return modalData?.component;
  };

  const closeModal = () => {
    dispatch({
      type: REDUCER_TYPES.NULL_MODAL_DATA,
    });
  };

  return (
    <div className={classnames(
      'modal',
      hideModal && '-hidden',
    )}>
      <div className="modal__container">
        <div className="modal__backdrop"></div>
        <div className="modal__content">
          <h2 className="modal__title">{modalData?.title || intlMessages?.common?.attention}</h2>
          <div className="modal__message-container">
            <p className="modal__message">{modalData?.message || ''}</p>
          </div>
          <div className="modal__component">
            {modalData?.component && (
              renderModalDataComponent()
            )}
          </div>
          {!modalData?.hideButtons && (
            <div className="modal__button-container">
              <Button
                className="modal__button"
                label={intlMessages?.common?.ok}
                handleClick={closeModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
