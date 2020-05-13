import React, { Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { connect } from "react-redux";
import { login } from "../actions/login";
import SelectInput from "./common/form/SelectInput";
import { withRouter } from "react-router-dom";

const validate = combineValidators({
  user: isRequired("user"),
});

const LoginPage = (props) => {
  const { dispatch, users } = props;

  const listUsers = Object.keys(users).map((i) => {
    return { key: users[i].id, text: users[i].name, value: users[i].id };
  });

  const doLogin = (userId) => {
    dispatch(login(userId));
    props.history.push("/home");
  };
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
                doLogin(values.user);
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
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(LoginPage));
