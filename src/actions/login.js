export const SET_CURRENT_LOGGED_IN_USER = "SET_CURRENT_LOGGED_IN_USER";

export function setCurrentLoggedInUser(id) {
  return {
    type: SET_CURRENT_LOGGED_IN_USER,
    id,
  };
}
