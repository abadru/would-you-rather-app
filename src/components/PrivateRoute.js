import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/*
  This is a private route that can only ne reached if the user is logged in
  All private routes are protected by this one
 */

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

function mapStateToProps({ login }) {
  return {
    isLoggedIn: login ? login.userId !== "" : false,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
