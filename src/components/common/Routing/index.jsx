import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import { handleTokenStorage } from '../../../utils/helpers';

const ProtectedRoute = (props) => {
  const { children } = props;

  const token = handleTokenStorage.get();

  if (!token) {
    return <Navigate replace to={`${PATHS.user}${PATHS.root}`} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
