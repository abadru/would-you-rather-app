import { SELECT_QUESTION } from "../actions/questions";

export default function selectQuestionReducer(state = null, action) {
  switch (action.type) {
    case SELECT_QUESTION:
      return action.question;
    default:
      return state;
  }
}
