import { _getUsers } from "../data/_DATA";

export const GET_USERS = "GET_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const USER_ANSWER_QUESTION = "USER_ANSWER_QUESTION";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

/*
  This retrieves a list of users and then dispatch the getUser action
 */
export function handleGetUsers() {
  return (dispatch) => {
    return _getUsers().then((users) => {
      dispatch(getUsers(users));
    });
  };
}

export function addUserQuestion(authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid,
  };
}

export function saveUserAnswer(auth, qid, option) {
  return {
    type: USER_ANSWER_QUESTION,
    auth,
    qid,
    option,
  };
}
