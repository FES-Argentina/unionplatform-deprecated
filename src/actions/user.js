import { LOGIN_REQUEST, SET_AUTH } from '../constants';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    data: {username, password},
  }
}

export function setAuth(token) {
  return {
    type: SET_AUTH,
    authToken: token,
  }
}
