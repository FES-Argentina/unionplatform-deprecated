import {
  LOGIN_REQUEST, LOGOUT_REQUEST, SET_AUTH, UPDATE_USER, UPDATE_USER_SUCCESS,
} from '../constants';

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

export function updateUserAction(id, newValues) {
  return {
    type: UPDATE_USER,
    data: { id, newValues },
  };
}

export function updateUserSuccessAction(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
}
