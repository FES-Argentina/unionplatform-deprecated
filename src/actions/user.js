import * as constants from '../constants';

export function loginRequest(username, password) {
  return {
    type: constants.LOGIN_REQUEST,
    data: { username, password },
  };
}

export function logoutRequest() {
  return {
    type: constants.LOGOUT_REQUEST,
  };
}

export function setAuth(response) {
  return {
    type: constants.SET_AUTH,
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

export function setAuthToken(authToken) {
  return {
    type: constants.SET_AUTH_TOKEN,
    authToken,
  };
}

export function setLogout() {
  return {
    type: constants.SET_AUTH,
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
    type: constants.UPDATE_USER,
    data: { id, newValues },
  };
}

export function updateUserSuccess(profile) {
  return {
    type: constants.UPDATE_USER_SUCCESS,
    profile,
  };
}

export function getUser(id) {
  return {
    type: constants.GET_USER,
    id,
  };
}

export function getUserSuccess(user) {
  return {
    type: constants.GET_USER_SUCCESS,
    payload: user,
  };
}

export function setEnrollment(values) {
  return {
    type: constants.SET_ENROLLMENT,
    data: values,
  };
}

export function setEnrollmentSuccess(enrollment) {
  return {
    type: constants.SET_ENROLLMENT_SUCCESS,
    enrollments: enrollment,
  };
}

export function setComplaint(values) {
  return {
    type: constants.SET_COMPLAINT,
    data: values,
  };
}

export function newPassword(nameOrEmail) {
  return {
    type: constants.REQUEST_NEW_PASS,
    data: nameOrEmail,
  };
}

export function resetUserPass(password, credentials) {
  return {
    type: constants.RESET_USER_PASS,
    password,
    credentials,
  }
}

export function changeUserPass(id, newValues) {
  return {
    type: constants.CHANGE_USER_PASS,
    data: { id, newValues },
  };
}

export function changeUserPassSuccess(user) {
  return {
    type: constants.CHANGE_USER_PASS_SUCCESS,
    user,
  };
}

export function getComplaints() {
  return {
    type: constants.GET_COMPLAINTS,
  };
}

export function getComplaintsSuccess(complaints) {
  return {
    type: constants.GET_COMPLAINTS_SUCCESS,
    payload: complaints,
  };
}
