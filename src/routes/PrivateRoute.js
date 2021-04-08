import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';

import { AuthContext } from '../shared/context/AuthContext';

export default function PrivateRoute({
  component: Component,
  redirectTo,
  isAdmin,
  ...otherProps
}) {
  const auth = useContext(AuthContext);

  //isAdmin: flag to decide the type of PrivateRoute
  return isAdmin ? (
    //admin route
    <Route
      {...otherProps}
      render={(props) => (auth.isAdmin ? <Component {...props} /> : null)}
    />
  ) : (
    //pricate route
    <Route
      {...otherProps}
      render={(props) => (auth.isLoggedIn ? <Component {...props} /> : null)}
    />
  );
}
