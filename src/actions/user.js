import {
  LOGIN_REQUEST, LOGOUT_REQUEST, SET_AUTH, UPDATE_USER, UPDATE_USER_SUCCESS, GET_USER, GET_USER_SUCCESS, SET_ENROLLMENT, SET_ENROLLMENT_SUCCESS,
  SET_COMPLAINT, SET_COMPLAINT_SUCCESS, CHANGE_USER_PASS, CHANGE_USER_PASS_SUCCESS, RESET_USER_PASS, REQUEST_NEW_PASS, GET_COMPLAINTS,
  GET_COMPLAINTS_SUCCESS, GET_COMPLAINT_IMAGES_SUCCESS } from '../constants';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    data: { username, password },
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function setAuth(response) {
  return {
    type: SET_AUTH,
    tokens: {
      csrf: response.data.csrf_token,
      logout: response.data.logout_token,
    },
    cookie: response.cookie[0],
    current_user: {
      username: response.data.current_user.name,
      id: response.data.current_user.uid,
    },
  };
}

export function setLogout() {
  return {
    type: SET_AUTH,
    tokens: {
      csrf: null,
      logout: null,
    },
    cookie: null,
    current_user: null,
  };
}

export function updateUserAction(id, newValues) {
  return {
    type: UPDATE_USER,
    data: { id, newValues },
  };
}

export function updateUserSuccess(profile) {
  return {
    type: UPDATE_USER_SUCCESS,
    profile,
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

export function setComplaint(values) {
  return {
    type: SET_COMPLAINT,
    data: values,
  };
}

export function setComplaintSuccess(complaint) {
  return {
    type: SET_COMPLAINT_SUCCESS,
    complaints: complaint,
  };
}

export function newPassword(nameOrEmail) {
  return {
    type: REQUEST_NEW_PASS,
    data: nameOrEmail,
  };
}

export function resetUserPass(password, credentials) {
  return {
    type: RESET_USER_PASS,
    password,
    credentials,
  }
}

export function changeUserPass(id, newValues) {
  return {
    type: CHANGE_USER_PASS,
    data: { id, newValues },
  };
}

export function changeUserPassSuccess(user) {
  return {
    type: CHANGE_USER_PASS_SUCCESS,
    user,
  };
}

export function getComplaints() {
  return {
    type: GET_COMPLAINTS,
  };
}

export function getComplaintsSuccess(complaints) {
  return {
    type: GET_COMPLAINTS_SUCCESS,
    payload: complaints,
  };
}
