import React from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  Divider,
  Header,
} from "semantic-ui-react";

import { Form as FinalForm, Field } from "react-final-form";

import { combineValidators, isRequired } from "revalidate";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import TextInput from "./common/form/TextInput";

const validate = combineValidators({
  optionOne: isRequired({ message: "The option one required" }),
  optionTwo: isRequired({ message: "The option two required" }),
});

const NewQuestion = (props) => {
  const { dispatch, history } = props;

  const handleFormSubmit = (values) => {
    dispatch(handleAddQuestion(values.optionOne, values.optionTwo));
    props.history.push("/home");
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Header icon>Create New Question</Header>
          <hr />
          <p>
            <strong>Would you rather ...</strong>
          </p>
          <FinalForm
            validate={validate}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="optionOne"
                  placeholder="Option One"
                  component={TextInput}
                />
                <Divider horizontal>Or</Divider>

                <Field
                  name="optionTwo"
                  placeholder="Option Two"
                  component={TextInput}
                />

                <Button
                  disabled={invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/home")}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(connect()(NewQuestion));
