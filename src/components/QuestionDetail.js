import * as React from "react";
import { withRouter } from "react-router-dom";
import { Component, Fragment } from "react";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import { handleSaveQuestionAnswer, selectQuestion } from "../actions/questions";
import { Button, Card, Image, Radio, Form, Divider } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import ProgressBar from "react-bootstrap/ProgressBar";

class QuestionDetail extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  componentDidMount() {
    const { id } = this.props.match.params;
    const { questions, dispatch } = this.props;

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
    const {
      users,
      selectedQuestion,
      answer,
      total,
      percentageOptionOne,
      percentageOptionTwo,
      votesOption1,
      votesOption2,
    } = this.props;

    return (
      <Fragment>
        {selectedQuestion && (
          <Card fluid>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src={
                  users[selectedQuestion.author].avatarURL || "/assets/user.png"
                }
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
                          disabled={
                            answer === "optionOne" || answer === "optionTwo"
                          }
                          label={selectedQuestion.optionOne.text}
                          name="radioGroup"
                          value="optionOne"
                          checked={
                            answer
                              ? answer === "optionOne"
                              : this.state.value === "optionOne"
                          }
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Divider horizontal>Or</Divider>
                      <Form.Field>
                        <Radio
                          disabled={
                            answer === "optionOne" || answer === "optionTwo"
                          }
                          label={selectedQuestion.optionTwo.text}
                          name="radioGroup"
                          value="optionTwo"
                          checked={
                            answer
                              ? answer === "optionTwo"
                              : this.state.value === "optionTwo"
                          }
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <div className="ui one center aligned buttons">
                        <Button
                          primary
                          color="green"
                          disabled={
                            answer === "optionOne" || answer === "optionTwo"
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {answer && (
                <div>
                  <Card>
                    <Card.Content>
                      <div
                        className={
                          answer === "optionOne"
                            ? "selected-option"
                            : "no-option"
                        }
                      >
                        <p>
                          Would you rather {selectedQuestion.optionOne.text}
                        </p>
                        <ProgressBar
                          now={percentageOptionOne}
                          label={`${percentageOptionOne}%`}
                        />
                        <p>
                          <strong>
                            {votesOption1} out of {total} votes
                          </strong>
                        </p>
                      </div>
                    </Card.Content>
                  </Card>

                  <Divider horizontal></Divider>

                  <Card>
                    <Card.Content>
                      <div
                        className={
                          answer === "optionTwo"
                            ? "selected-option"
                            : "no-option"
                        }
                      >
                        <p>
                          Would you rather {selectedQuestion.optionTwo.text}
                        </p>
                        <ProgressBar
                          now={percentageOptionTwo}
                          label={`${percentageOptionTwo}%`}
                        />
                        <p>
                          <strong>
                            {votesOption2} out of {total} votes
                          </strong>
                        </p>
                      </div>
                    </Card.Content>
                  </Card>
                </div>
              )}
            </Card.Content>
          </Card>
        )}
      </Fragment>
    );
  }
}

function formatNumber(x) {
  return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps({ questions, users, selectedQuestion, login }) {
  const { userId } = login;

  //First get the answers for the current logged in users
  const answers = users[userId].answers;

  let answer,
    percentageOptionOne,
    percentageOptionTwo,
    total,
    votesOption1,
    votesOption2;

  if (selectedQuestion) {
    /*
  Check if the answers of the current user contains the selected question. If yes, grabs the answer
  and store in answer variable
 */
    if (answers.hasOwnProperty(selectedQuestion.id)) {
      answer = answers[selectedQuestion.id];
    }

    // Calculate the total answers for the selected question
    total =
      selectedQuestion.optionOne.votes.length +
      selectedQuestion.optionTwo.votes.length;

    votesOption1 = selectedQuestion.optionOne.votes.length;
    votesOption2 = selectedQuestion.optionTwo.votes.length;

    // Calculate corresponding % of each option
    percentageOptionOne = formatNumber(
      (selectedQuestion.optionOne.votes.length / total) * 100
    );
    percentageOptionTwo = formatNumber(
      (selectedQuestion.optionTwo.votes.length / total) * 100
    );
  }

  return {
    questions,
    users,
    selectedQuestion,
    answer,
    total,
    percentageOptionOne,
    percentageOptionTwo,
    votesOption1,
    votesOption2,
  };
}
export default withRouter(connect(mapStateToProps)(QuestionDetail));
