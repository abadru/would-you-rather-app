import { SAVE_ANSWER, SELECT_QUESTION } from "../actions/questions";

export default function selectQuestionReducer(state = null, action) {
  switch (action.type) {
    case SELECT_QUESTION:
      return action.question;
    case SAVE_ANSWER:
      const { authedUser, answer } = action;
      return {
        ...state,
        [answer]: {
          ...state[answer],
          votes: state[answer].votes.concat([authedUser]),
        },
      };
    default:
      return state;
  }
}
