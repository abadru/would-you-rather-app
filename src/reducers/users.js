import { GET_USERS } from "../actions/users";

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    default:
      return state;
  }
}
