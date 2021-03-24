import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...otherProps
}) {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        auth.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
}
