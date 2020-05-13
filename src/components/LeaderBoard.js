// @flow
import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "react";
import LeaderBoardItem from "./LeaderBoardItem";

const LeaderBoard = (props) => {
  const { users } = props;
  return (
    <Fragment>
      {users.map((user) => (
        <LeaderBoardItem key={user.id} user={user} />
      ))}
    </Fragment>
  );
};

LeaderBoard.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = ({ users }) => {
  const userScore = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a)),
  };
};
export default connect(mapStateToProps)(LeaderBoard);
