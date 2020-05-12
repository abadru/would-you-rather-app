export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(id) {
  return {
    type: LOGIN,
    id,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
