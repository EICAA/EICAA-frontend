import React from 'react';
import * as classnames from 'classnames';
import { AppContext } from '../../../storage/context';
import './index.scss';

const LoadingLayer = () => {
  const { isLoading = false } = React.useContext(AppContext)[0];

  return (
    <div className={classnames(
      'loading-layer',
      isLoading && '-active',
    )}></div>
  );
};

export default LoadingLayer;
