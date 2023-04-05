import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { FEED_URL } from '../../lib/routes';
import { useAuth } from '../../hooks/useAuth';

interface IPublicRouteProps {
  children: ReactElement;
}

export function PublicRoute({ children }: IPublicRouteProps) {
  const { currentUser, isLoadingUser } = useAuth();

  if (isLoadingUser) return <></>;

  if (currentUser?.username && !isLoadingUser) {
    return <Navigate to={FEED_URL} />;
  }

  return children;
}
