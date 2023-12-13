import React from 'react';
import { useParams } from 'react-router';
import { useIntl } from 'react-intl';
import useSnackBar from '../../components/common/ui/SnackBar/hooks';
import { useLoadingLayer, useShowErrorModal } from './index';
import { getCdkModuleRating, postCdkModuleRating } from '../../api/services/Cdk';

export const useCdkModuleRating = () => {
  const [cdkRating, setCdkRating] = React.useState({});
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { cdkRepositoryType, cdkId } = useParams();

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();
  const snackBar = useSnackBar();

  const fetchCdkRating = React.useCallback(async () => {
    try {
      loadingLayer.show();

      const response = await getCdkModuleRating(cdkRepositoryType, cdkId);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data) {
        setCdkRating(data.data);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      setIsInitialized(true);
      loadingLayer.hide();
    }
  }, [cdkRepositoryType, cdkId, loadingLayer, showErrorModal]);

  const postCdkRating = React.useCallback(
    async (values) => {
      try {
        loadingLayer.show();

        const response = await postCdkModuleRating(cdkRepositoryType, cdkId, values);
        const { data, status } = response;

        if (status >= 200 && status < 300 && data.data) {
          snackBar.open(intl.messages.snackBars?.ratingSubmitted);
        }
      } catch (err) {
        showErrorModal(err);
      } finally {
        loadingLayer.hide();
      }
    },
    [cdkRepositoryType, cdkId, intl.messages, loadingLayer, showErrorModal, snackBar],
  );

  React.useEffect(() => {
    fetchCdkRating();
  }, [fetchCdkRating]);

  return React.useMemo(
    () => ({ cdkRating, isInitialized, postCdkRating }),
    [cdkRating, isInitialized, postCdkRating],
  );
};
