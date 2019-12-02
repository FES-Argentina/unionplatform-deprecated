import {
  LOGIN_REQUEST, LOGOUT_REQUEST, SET_AUTH, UPDATE_USER, UPDATE_USER_SUCCESS, GET_USER, GET_USER_SUCCESS, SET_ENROLLMENT, SET_ENROLLMENT_SUCCESS
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

export function updateUserSuccess(user) {
  return {
    type: UPDATE_USER_SUCCESS,
    user,
  };
}

export function getUser(id) {
  return {
    type: GET_USER,
    id,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
}

export function setEnrollment(values) {
  return {
    type: SET_ENROLLMENT,
    data: values,
  };
}

export function setEnrollmentSuccess(enrollment) {
  return {
    type: SET_ENROLLMENT_SUCCESS,
    enrollments: enrollment,
  };
}
