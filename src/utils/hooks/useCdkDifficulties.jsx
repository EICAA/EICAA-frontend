import React from 'react';
import { useParams } from 'react-router';
import { getCdkDifficulties } from '../../api/services/Cdk';
import { useLoadingLayer } from './useLoadingLayer';
import { useShowErrorModal } from './useShowErrorModal';

export const useCdkDifficulties = () => {
  const [difficulties, setDifficulties] = React.useState([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { cdkRepositoryType } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const getDifficulties = React.useCallback(async () => {
    try {
      loadingLayer.show();
      const response = await getCdkDifficulties(cdkRepositoryType);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        const difficultyList = data.data;
        if (difficultyList.length > 0) {
          setDifficulties(difficultyList);
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
    getDifficulties();
  }, [getDifficulties]);

  return React.useMemo(() => (
    { difficulties, isInitialized }
  ), [difficulties, isInitialized]);
};
