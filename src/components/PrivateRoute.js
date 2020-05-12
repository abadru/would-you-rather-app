import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
    isLoggedIn: login.id !== "",
  };
}

export default connect(mapStateToProps)(PrivateRoute);
