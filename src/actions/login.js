export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/*
  This action creator will e dispatched when logging in into the application. It expects the user id
 */
export function login(id) {
  return {
    type: LOGIN,
    id,
  };
}

/*
  This action creator will e dispatched when logging out from the application
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}

export function handleLogout(dispatch, cb) {
  dispatch(logout());
  setTimeout(cb, 500);
}

export function handleLogin(id, dispatch, cb) {
  dispatch(login(id));
  setTimeout(cb, 500);
}
