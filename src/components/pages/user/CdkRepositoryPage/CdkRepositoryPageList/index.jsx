import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import CdkFilterBar from '../../../../common/CdkFilterBar';
import CdkRepositoryHelp from '../../../../common/CdkRepositoryHelp';
import CdkList from '../../../../common/CdkList';
import './index.scss';

const CdkRepositoryPageList = () => {
  const [filters, setFilters] = React.useState();

  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();

  const applyFilters = (values, { setSubmitting }) => {
    const filterData = {
      area: values.area?.value,
      competence: values.competence?.value,
      difficulty: values.difficulty?.value,
      search: values.search,
    };

    const params = new URLSearchParams();

    Object.keys(filterData).forEach(key => {
      if (filterData[key]) {
        params.append(key, filterData[key]);
      } else {
        delete filterData[key];
      }
    });
    
    setFilters(filterData);
    setSubmitting(false);
    navigate(`${location.pathname}?${params}`);
  };

  React.useEffect(() => {
    const paramEntries = Object.fromEntries(new URLSearchParams(location.search).entries());
    
    Object.keys(paramEntries).forEach(key => {
      if (!paramEntries[key]) {
        delete paramEntries[key];
      }
    });
    
    setFilters(paramEntries);
  }, [location]);

  return (
    <div className="cdk-repository-page-list">
      <CdkRepositoryHelp className='cdk-repository-page-list__help' />
      <div className="cdk-repository-page-list__content">
        <h2 className="cdk-repository-page-list__subtitle">
          {intl.messages.user?.cdkRepositoryPage.list.subTitle}
        </h2>
        <CdkFilterBar
          className="cdk-repository-page-list__filter-bar"
          applyFilters={applyFilters}
        />
        <CdkList filters={filters} />
      </div>
    </div>
  );
};

export default CdkRepositoryPageList;
