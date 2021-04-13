import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';

function PrivateRoute({
  component: Component,
  redirectTo,
  isAdminMode,
  isAdmin,
  isLoggined,
  ...otherProps
}) {
  //isAdmin: flag to decide the type of PrivateRoute
  return isAdminMode ? (
    //admin route
    <Route
      {...otherProps}
      render={(props) => (isAdmin ? <Component {...props} /> : null)}
    />
  ) : (
    //pricate route
    <Route
      {...otherProps}
      render={(props) => (isLoggined ? <Component {...props} /> : null)}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggined: state.userReducer.isLoggined,
    isAdmin: state.userReducer.isAdmin,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
