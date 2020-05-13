import {
  ADD_USER_QUESTION,
  GET_USERS,
  USER_ANSWER_QUESTION,
} from "../actions/users";

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };

    case USER_ANSWER_QUESTION:
      return {
        ...state,
        [action.auth]: {
          ...state[action.auth],
          answers: {
            ...state[action.auth].answers,
            [action.qid]: action.option,
          },
        },
      };

    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid]),
        },
      };
    default:
      return state;
  }
}
