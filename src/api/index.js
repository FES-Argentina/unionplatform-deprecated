import axios from 'axios';
import Config from 'react-native-config';

export function getDocumentsRequest() {
  return axios.get(`${Config.API_URL}/documents`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function getDocumentRequest(id) {
  return axios.get(`${Config.API_URL}/documents/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}

export function login(username, password) {
  return axios.post(`${Config.API_URL}/login`, { username, password })
    .then((response) => response.data);
}

export function updateUser(id, data) {
  return axios.put(`${Config.API_URL}/users/${id}`, { user: data })
    .then((response) => response.data);
}
