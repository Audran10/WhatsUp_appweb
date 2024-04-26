import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authentifiation/CheckAuth';

interface AnonymousRouteProps {
  element: React.ReactNode;
}

const AnonymousRoute: React.FC<AnonymousRouteProps> = ({ element }) => {
  const currentUser = useAuth();

  return !currentUser ? element : <Navigate to={'/'} />;
};

export default AnonymousRoute;
