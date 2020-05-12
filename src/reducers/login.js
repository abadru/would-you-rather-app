import { LOGIN, LOGOUT } from "../actions/login";

export default function loginReducer(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return {
        userId: action.id,
        userName: "",
      };
    case LOGOUT:
      return {
        userId: "",
        userName: "",
      };
    default:
      return state;
  }
}
