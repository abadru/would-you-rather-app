import * as React from "react";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import { selectQuestion } from "../actions/questions";

class QuestionDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    const { questions, dispatch } = this.props;

    const question = questions[id];

    if (!question) {
      return <NotFound />;
    }

    dispatch(selectQuestion(question));
  }

  render() {
    return (
      <div>
        <h1>Question Details</h1>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questions,
  };
}
export default withRouter(connect(mapStateToProps)(QuestionDetail));
