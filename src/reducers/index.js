import { combineReducers } from "redux";
import modalReducer from "./modal";
import loginReducer from "./login";
import usersReducer from "./users";
import questionsReducer from "./questions";
import selectQuestionReducer from "./selectedQuestion";

export default combineReducers({
  modal: modalReducer,
  login: loginReducer,
  users: usersReducer,
  questions: questionsReducer,
  selectedQuestion: selectQuestionReducer,
});
