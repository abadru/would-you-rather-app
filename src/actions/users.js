import { _getUsers } from "../data/_DATA";

export const GET_USERS = "GET_USERS";

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
