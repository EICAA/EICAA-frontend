import React from 'react';
import { useParams } from 'react-router';
import { getCdkCompetences } from '../../api/services/Cdk';
import { useLoadingLayer } from './useLoadingLayer';
import { useShowErrorModal } from './useShowErrorModal';

export const useCdkCompetences = () => {
  const [competences, setCompetences] = React.useState([]);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { cdkRepositoryType } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const getCompetences = React.useCallback(async (area=null) => {
    try {
      loadingLayer.show();
      const queryObject = area ? { area } : null;
      const response = await getCdkCompetences(cdkRepositoryType, queryObject);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        const competenceList = data.data;
        if (competenceList.length > 0) {
          setCompetences(competenceList);
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
    getCompetences();
  }, [getCompetences]);

  return React.useMemo(() => (
    { competences, getCompetences, isInitialized }
  ), [competences, getCompetences, isInitialized]);
};
