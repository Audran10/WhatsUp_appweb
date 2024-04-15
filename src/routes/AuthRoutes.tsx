import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/authentifiation/CheckAuth';

interface AuthRouteProps {
  element: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element }) => {
  const currentUser = useAuth();

  return currentUser ? element : <Navigate to={'/signin'} />;
};

export default AuthRoute;
