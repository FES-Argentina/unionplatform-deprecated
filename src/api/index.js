import axios from 'axios';
import Config from 'react-native-config';
import SetCookieParser from 'set-cookie-parser';
import { store } from '../store';

const api = axios.create({
  withCredentials: false,
})

/**
 * Returns an object with headers for api requests.
 */
function buildHeaders() {
  const state = store.getState();
  return {
    Cookie: `${state.user.cookie.name}=${state.user.cookie.value}`,
  };
}

export function getDocumentsRequest() {
  return api.get(`${Config.API_URL}/documents`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function getDocumentRequest(id) {
  return api.get(`${Config.API_URL}/documents/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function login(username, password) {
  return api.post(`${Config.API_URL}/user/login?_format=json`, { name: username, pass: password })
    .then((response) => {
      var cookie = SetCookieParser(response.headers['set-cookie'], {decodeValues: true});
      return {
        data: response.data,
        cookie,
      };
    });
}

export function loginStatus() {
  const headers = buildHeaders();
  return api.get(`${Config.API_URL}/user/login_status?_format=json`, { headers })
    .then((response) => response.data);
}

export function updateUser(id, data) {
  return api.put(`${Config.API_URL}/users/${id}`, { user: data })
    .then((response) => response.data);
}

export function getUserRequest(id) {
  return api.get(`${Config.API_URL}/users/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function getNewsRequest() {
  return api.get(`${Config.API_URL}/news`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function getNewRequest(id) {
  return api.get(`${Config.API_URL}/news/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function setEnrollmentRequest(values) {
  return api.post(`${Config.API_URL}/enrollments`, { enrollment: values })
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function setComplaintRequest(values) {
  return api.post(`${Config.API_URL}/complaints`, { complaint: values })
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function changeUserPass(id, data) {
  return api.put(`${Config.API_URL}/users/${id}`, { pass: data })
    .then((response) => response.data);
}

export function getComplaintsRequest() {
  return api.get(`${Config.API_URL}/complaints`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function getAlertsRequest() {
  return api.get(`${Config.API_URL}/alerts`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function setAlertRequest(values) {
  return api.post(`${Config.API_URL}/alertsform`, { alert: values })
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}
