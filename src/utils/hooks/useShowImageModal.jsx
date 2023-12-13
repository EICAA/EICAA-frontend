import React from 'react';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';

export const useShowImageModal = () => {
  const [, dispatch] = React.useContext(AppContext);

  const showImage = React.useCallback((image) => {

    dispatch({
      type: REDUCER_TYPES.SET_IMAGE_MODAL,
      imageModal: {
        image: image.image,
        alt: image.alt,
      },
    });
  
  }, [dispatch]);

  return showImage;
};
