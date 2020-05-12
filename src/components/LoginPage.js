import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { combineValidators, isRequired } from "revalidate";
import { connect } from "react-redux";
import { setCurrentLoggedInUser } from "../actions/login";
import SelectInput from "./common/form/SelectInput";
import { Redirect } from "react-router-dom";

const validate = combineValidators({
  user: isRequired("user"),
});

const LoginPage = (props) => {
  const { dispatch, users } = props;

  const listUsers = Object.keys(users).map((i) => {
    return { key: users[i].id, text: users[i].name, value: users[i].name };
  });

  const doLogin = (userId) => {
    dispatch(setCurrentLoggedInUser(userId));
    return <Redirect to="/home" />;
  };
  return (
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
            content="Login to Would You Rather"
            color="teal"
            textAlign="center"
          />

          <Field
            component={SelectInput}
            options={listUsers}
            name="user"
            placeholder="Users"
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
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);
