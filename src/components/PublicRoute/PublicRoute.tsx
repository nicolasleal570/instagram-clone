import { ReactElement } from 'react';

interface IPublicRouteProps {
  children: ReactElement;
}

export function PublicRoute({ children }: IPublicRouteProps) {
  return children;
}
