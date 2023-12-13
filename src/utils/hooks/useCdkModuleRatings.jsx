import React from 'react';
import { useParams } from 'react-router';
import { getCdkModuleRatings } from '../../api/services/Cdk';
import { useLoadingLayer, useShowErrorModal } from './index';

export const useCdkModuleRatings = () => {
  const [cdkRatings, setCdkRatings] = React.useState({});
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { cdkRepositoryType, cdkId } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const fetchCdkRatings = React.useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await getCdkModuleRatings(cdkRepositoryType, cdkId);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data) {
        setCdkRatings(data.data);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      setIsInitialized(true);
      loadingLayer.hide();
    }
  }, [cdkRepositoryType, cdkId, loadingLayer, showErrorModal]);

  React.useEffect(() => {
    fetchCdkRatings();
  }, [fetchCdkRatings]);

  return React.useMemo(
    () => ({ cdkRatings, isInitialized, fetchCdkRatings }),
    [cdkRatings, isInitialized, fetchCdkRatings],
  );
};
