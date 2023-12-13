import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import Button from '../ui/Buttons/Button';
import './index.scss';

const PromptModal = () => {
  const [{ promptModalData = {} }, dispatch] = React.useContext(AppContext);

  const intlMessages = promptModalData?.intlMessages;
  const hideModal = !promptModalData?.title && !promptModalData?.description;

  const handleAccept = () => {
    if (promptModalData?.acceptHandler) {
      promptModalData.acceptHandler();
    }
    dispatch({
      type: REDUCER_TYPES.NULL_PROMPT_MODAL_DATA,
    });
  };

  const handleCancel = () => {
    if (promptModalData?.cancelHandler) {
      promptModalData.cancelHandler();
    }
    dispatch({
      type: REDUCER_TYPES.NULL_PROMPT_MODAL_DATA,
    });
  };

  return (
    <div className={classnames(
      'prompt-modal',
      hideModal && '-hidden',
    )}>
      <div className="prompt-modal__container">
        <div className="prompt-modal__backdrop"></div>
        <div className="prompt-modal__content">
          <h2 className="prompt-modal__title">{promptModalData?.title || intlMessages?.common?.attention}</h2>
          <div className="prompt-modal__message-container">
            <p className="prompt-modal__message">{promptModalData?.message || ''}</p>
          </div>
          <div className="prompt-modal__button-container">
            <Button
              className="prompt-modal__button"
              label={intlMessages?.common?.ok}
              handleClick={handleAccept}
            />
            <Button
              className="prompt-modal__button -red"
              label={intlMessages?.common?.cancel}
              handleClick={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
