import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_URL } from '../../lib/routes';
import { useAuth } from '../../hooks/useAuth';

interface IPrivateRouteProps {
  children: ReactElement;
}

export function PrivateRoute({ children }: IPrivateRouteProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={LOGIN_URL} />;
  }

  return children;
}
