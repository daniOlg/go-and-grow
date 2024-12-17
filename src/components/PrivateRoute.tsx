import { ComponentType } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUser } from 'reactfire';

export function PrivateRoute({
  component: Component,
  ...rest
}: RouteProps & { component: ComponentType<any> }) {
  const { data: user, status } = useUser();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
}
