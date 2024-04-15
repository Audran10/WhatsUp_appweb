import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/authentifiation/CheckAuth';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AuthRouteProps {
  element: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  const user = useSelector((state: RootState) => state.user.value);

  console.log('authroute user:', user);

  const currentUser = useAuth();

  console.log('currentUser:', currentUser);

  return currentUser ? element : <Navigate to={'/signin'} />;
};

export default AuthRoute;
