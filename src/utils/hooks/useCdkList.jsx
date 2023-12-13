import React from 'react';
import { useParams } from 'react-router';
import { getCdkList } from '../../api/services/Cdk';
import { calculateCdkModuleCount } from '../../components/common/CdkList/helpers';
import { useLoadingLayer, useShowErrorModal } from './index';

export const useCdkList = (tableElementHeight, filters) => {
  const [cdkList, setCdkList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(0);
  const [start, setStart] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { cdkRepositoryType } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const onResize = React.useCallback(() => {
    const modulesPerPage = calculateCdkModuleCount(tableElementHeight);

    setLimit(modulesPerPage);
    setStart(0);
    setPage(1);
  }, [tableElementHeight]);

  const fetchCdkList = React.useCallback(async (filters={}) => {
    try {
      loadingLayer.show();

      const query = { ...filters, start, limit };

      const response = await getCdkList(cdkRepositoryType, query);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data && data.meta) {
        setCdkList(data.data);
        setCount(data.meta.count);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [loadingLayer, showErrorModal, cdkRepositoryType, start, limit]);

  React.useEffect(() => {
    if (limit) {
      fetchCdkList(filters);
    }
  }, [limit, filters, fetchCdkList]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  React.useEffect(() => {
    setPage(1);
    setStart(0);
  }, [filters]);

  return React.useMemo(() => (
    { cdkList, page, limit, count, setPage, setStart }
  ), [cdkList, page, limit, count, setPage, setStart]);
};
