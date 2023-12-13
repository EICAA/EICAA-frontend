import React from 'react';
import { useParams } from 'react-router';
import { getCdkAreas } from '../../api/services/Cdk';
import { useLoadingLayer } from './useLoadingLayer';
import { useShowErrorModal } from './useShowErrorModal';

export const useCdkAreas = () => {
  const [areas, setAreas] = React.useState([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { cdkRepositoryType } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const getAreas = React.useCallback(async () => {
    try {
      loadingLayer.show();
      const response = await getCdkAreas(cdkRepositoryType);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        const areaList = data.data;
        if (areaList.length > 0) {
          setAreas(areaList);
        }
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      setIsInitialized(true);
      loadingLayer.hide();
    }
  }, [cdkRepositoryType, loadingLayer, showErrorModal]);

  React.useEffect(() => {
    getAreas();
  }, [getAreas]);

  return React.useMemo(() => (
    { areas, isInitialized }
  ), [areas, isInitialized]);
};
