import { ReactElement } from 'react';

interface IPrivateRouteProps {
  children: ReactElement;
}

export function PrivateRoute({ children }: IPrivateRouteProps) {
  return children;
}
