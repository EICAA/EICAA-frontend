import React from 'react';
import { useLoadingLayer } from './useLoadingLayer';
import { useShowErrorModal } from './useShowErrorModal';

export const useDownloadFile = ({ id, fetchFromApi, getDownloadedFilename }) => {
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const downloadFile = React.useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await fetchFromApi(id);
      const href = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', getDownloadedFilename(id));
      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [id, fetchFromApi, getDownloadedFilename, loadingLayer, showErrorModal]);

  return downloadFile;
};