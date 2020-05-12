import { combineReducers } from "redux";
import modalReducer from "./modal";
import loginReducer from "./login";
import usersReducer from "./users";

export default combineReducers({
  modal: modalReducer,
  login: loginReducer,
  users: usersReducer,
});
