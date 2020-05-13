import * as React from "react";
import { withRouter } from "react-router-dom";
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import { handleSaveQuestionAnswer, selectQuestion } from "../actions/questions";
import { Button, Card, Image, Radio, Form, Divider } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";

class QuestionDetail extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  componentDidMount() {
    const { id } = this.props.match.params;
    const { questions, dispatch, users } = this.props;

    const question = questions[id];

    if (!question) {
      return <NotFound />;
    }

    dispatch(selectQuestion(question));
  }

  onSubmitAnswer(qid, answer) {
    this.props.dispatch(handleSaveQuestionAnswer(qid, answer));
  }

  render() {
    const { users, selectedQuestion } = this.props;

    return (
      <Fragment>
        {selectedQuestion && (
          <Card fluid>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src={users[selectedQuestion.author].avatarURL}
              />
              <Card.Header>
                {users[selectedQuestion.author].name} asks
              </Card.Header>
              <Card.Meta>@{users[selectedQuestion.author].id}</Card.Meta>
              <Card.Description>
                <strong>Would you rather...</strong>
                <hr />
                <FinalForm
                  onSubmit={() => {
                    this.onSubmitAnswer(selectedQuestion.id, this.state.value);
                  }}
                  render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Field>
                        <Radio
                          label={selectedQuestion.optionOne.text}
                          name="radioGroup"
                          value="optionOne"
                          checked={this.state.value === "optionOne"}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Divider horizontal>Or</Divider>
                      <Form.Field>
                        <Radio
                          label={selectedQuestion.optionTwo.text}
                          name="radioGroup"
                          value="optionTwo"
                          checked={this.state.value === "optionTwo"}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <div className="ui one center aligned buttons">
                        <Button primary color="green">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                />
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, users, selectedQuestion }) {
  return {
    questions,
    users,
    selectedQuestion,
  };
}
export default withRouter(connect(mapStateToProps)(QuestionDetail));
