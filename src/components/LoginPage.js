import React, { Component, Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { connect } from "react-redux";
import { handleLogin, login } from "../actions/login";
import SelectInput from "./common/form/SelectInput";
import { Redirect, withRouter } from "react-router-dom";

const validate = combineValidators({
  user: isRequired("user"),
});

class LoginPage extends Component {
  state = {
    redirectToReferrer: false,
  };

  doLogin(userId) {
    if (userId) {
      handleLogin(userId, this.props.dispatch, () => {
        this.setState(() => ({
          redirectToReferrer: true,
        }));
      });
    } else {
      alert("Please select a user");
    }
  }

  render() {
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: "/home" },
    };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    const { users } = this.props;
    const listUsers = Object.keys(users).map((i) => {
      return { key: users[i].id, text: users[i].name, value: users[i].id };
    });

    return (
      <Fragment>
        <div className="container">
          <div id="login-wrapper">
            <div className="login-title">
              <h1>Welcome to Would you rather game</h1>
            </div>

            <div className="container">
              <FinalForm
                onSubmit={(values) => {
                  this.doLogin(values.user);
                }}
                validate={validate}
                render={({
                  handleSubmit,
                  submitting,
                  submitError,
                  invalid,
                  pristine,
                  dirtySinceLastSubmit,
                }) => (
                  <Form onSubmit={handleSubmit} error>
                    <Header
                      as="h2"
                      content="Select a user to login"
                      color="teal"
                      textAlign="center"
                    />

                    <Field
                      component={SelectInput}
                      options={listUsers}
                      name="user"
                      placeholder="Users"
                      value={listUsers}
                    />

                    <Button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      loading={submitting}
                      color="teal"
                      content="Login"
                      fluid
                    />
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(LoginPage));
