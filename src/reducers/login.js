import { SET_CURRENT_LOGGED_IN_USER } from "../actions/login";

export default function loginReducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_LOGGED_IN_USER:
      return {
        userId: action.id,
        userName: "",
      };
    default:
      return state;
  }
}
