import React, { Component, Fragment } from "react";
import "../css/App.css";
import HomePage from "./HomePage";
import { Route, Switch, withRouter } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import { handleGetUsers } from "../actions/users";
import { connect } from "react-redux";
import QuestionDetail from "./QuestionDetail";
import NewQuestion from "./NewQuestion";
import { LoadingBar } from "react-redux-loading";
import LeaderBoard from "./LeaderBoard";
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { location, isLoggedIn } = this.props;
    return (
      <Fragment>
        <LoadingBar />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              {isLoggedIn && <NavBar />}
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <PrivateRoute exact path="/home" component={HomePage} />
                  <PrivateRoute
                    exact
                    path="/leaderboard"
                    component={LeaderBoard}
                  />
                  <PrivateRoute
                    path="/question/:id"
                    component={QuestionDetail}
                  />
                  <PrivateRoute
                    key={location.name}
                    path="/add"
                    component={NewQuestion}
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
}

function mapStateToProps({ login }) {
  return {
    isLoggedIn: login ? login.userId !== "" : false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
