import { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: FunctionComponent<any>;
}

export function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}
