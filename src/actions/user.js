import { LOGIN_REQUEST, LOGOUT_REQUEST, SET_AUTH } from '../constants';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    data: { username, password },
  };
}

export function logoutRequest(username, password) {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function setAuth(token) {
  return {
    type: SET_AUTH,
    authToken: token,
  };
}
