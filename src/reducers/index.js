import { combineReducers } from "redux";
import loginReducer from "./login";
import usersReducer from "./users";
import questionsReducer from "./questions";

export default combineReducers({
  login: loginReducer,
  users: usersReducer,
  questions: questionsReducer,
});
