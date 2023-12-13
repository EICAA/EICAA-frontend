import React from 'react';
import * as classnames from 'classnames';
import CdkFilterForm from '../../forms/user/CdkFilterForm';
import './index.scss';

const CdkFilterBar = props => {
  const { className, applyFilters } = props;

  return (
    <section className={classnames(
      'cdk-filter-bar',
      className && className,
    )}>
      <CdkFilterForm onSubmit={applyFilters} />
    </section>
  );
};

export default CdkFilterBar;
