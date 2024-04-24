import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authentifiation/CheckAuth';

interface AuthAdminRouteProps {
  element: React.ReactNode;
}

const AuthAdminRoute: React.FC<AuthAdminRouteProps> = ({ element }) => {
  const currentUser = useAuth();

  const isAdmin = currentUser?.role === 'admin';

  return currentUser && isAdmin ? element : <Navigate to={'/'} />;
};

export default AuthAdminRoute;
