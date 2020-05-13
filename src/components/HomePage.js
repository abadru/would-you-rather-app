import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleGetQuestions } from "../actions/questions";

import { Tab } from "semantic-ui-react";
import Question from "./Question";

class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetQuestions());
  }

  render() {
    const { questions, answeredQuestions, unansweredQuestions } = this.props;

    const panes = [
      {
        menuItem: "Unanswered Questions",
        render: () => (
          <Tab.Pane>
            {unansweredQuestions && unansweredQuestions.length === 0 && (
              <p>You have not unanswered questions</p>
            )}
            {unansweredQuestions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Answered Question",
        render: () => (
          <Tab.Pane>
            {answeredQuestions && answeredQuestions.length === 0 && (
              <p>You have not answered any question</p>
            )}
            {answeredQuestions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Fragment>
        <div className="container">
          <Tab
            menu={{
              color: "blue",
              inverted: true,
              attached: false,
              tabular: false,
            }}
            panes={panes}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, login, users }) {
  const userAnsweredQuestionIds = Object.keys(users[login.userId].answers);
  const allQuestions = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .map((i) => questions[i]);

  const myAnswered = allQuestions.filter((x) =>
    userAnsweredQuestionIds.includes(x.id)
  );

  const notAnswered = allQuestions.filter(
    (x) => !userAnsweredQuestionIds.includes(x.id)
  );

  return {
    questions: allQuestions,
    answeredQuestions: myAnswered,
    unansweredQuestions: notAnswered,
  };
}

export default connect(mapStateToProps)(HomePage);
