import React, { Fragment } from "react";
import "../css/App.css";
import HomePage from "./HomePage";
import { Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import ModalContainer from "./common/modals/ModalContainer";

function App(props) {
  const { location } = props;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute path="/question/:id" component={HomePage} />
                <PrivateRoute
                  key={location.key}
                  path="/new"
                  component={HomePage}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
