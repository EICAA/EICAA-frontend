import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import './index.scss';

const ImageModal = () => {
  const [{ imageModal = {} }, dispatch] = React.useContext(AppContext);

  const hideModal = !imageModal?.image && !imageModal?.alt;

  const closeImageModal = React.useCallback(() => {
    dispatch({
      type: REDUCER_TYPES.NULL_IMAGE_MODAL,
    });
  }, [dispatch]);

  return (
    <div className={classnames('image-modal', hideModal && '-hidden')}>
      <div className="image-modal__container">
        <div className="image-modal__backdrop" onClick={closeImageModal}></div>
        <div className="image-modal__content">
          <div className="image-modal__image-container">
            <img className="image-modal__image" src={imageModal?.image} alt={imageModal?.alt} />
            <div className="image-modal__button-container" onClick={closeImageModal}>
              <div className="image-modal__button-close" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
