import axios from 'axios';
import Config from 'react-native-config';
import SetCookieParser from 'set-cookie-parser';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';
import { store } from '../store';
import RNFetchBlob from 'rn-fetch-blob';

const api = axios.create({
  withCredentials: false,
});

/**
 * Delete cookies.
 */
function clearCookies() {
  return new Promise((success) => {
    RCTNetworking.clearCookies(success);
  });
}

export function sessionToken(){
  return api.get(`${Config.API_URL}/session/token`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ERROR', error);
  });
}

function registerBuildHeaders(post = false) {
  var token = sessionToken();
  var headers = {
    'Content-Type': 'application/json',
  };

  if (post) {
    headers['Content-Type'] = 'application/hal+json';
    headers['X-CSRF-Token'] = token;

  }

  return headers;
}

function getTokens() {
  const state = store.getState();
  const { authToken, logoutToken } = state.user;
  return { authToken, logoutToken };
}

export function getDocumentsRequest(page) {
  return clearCookies().then(() => {
      return api.get(`${Config.API_URL}/documents?page=${page}`)
        .then((response) => response.data)
        .catch((error) => {
          console.log('ERROR', error);
        });
  });
}

export function getDocumentRequest(id) {
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/documents/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function login(username, password) {
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/user/login?_format=json`, { name: username, pass: password })
      .then((response) => {
        var cookie = SetCookieParser(response.headers['set-cookie'], {decodeValues: true});
        return {
          data: response.data,
          cookie,
        };
      });
  });
}

export function logout() {
  return clearCookies().then(() => {
    const headers = buildHeaders();
    const { logoutToken } = getTokens();
    return api.post(`${Config.API_URL}/user/logout?_format=json&token=${logoutToken}`, null, { headers })
      .then((response) => response);
  });
}

export function loginStatus() {
  return clearCookies().then(() => {
    const headers = buildHeaders();
    return api.get(`${Config.API_URL}/user/login_status?_format=json`, { headers })
      .then((response) => response.data);
  });
}

export function updateUser(id, values) {
  const data = {
    _links : {
      type : {
        href : `${Config.API_URL}/rest/type/user/user`,
      },
      self : {
        href : `${Config.API_URL}/user/${id}?_format=hal_json`,
      }
    },
    uid : [{ value: id }],
    field_firstname : [{ value: values.firstname }],
    field_lastname : [{ value: values.lastname }],
    field_cuit : [{ value: values.cuit }],
    field_dni : [{ value: values.dni }],
    field_birthdate : [{ value: values.birthdate }],
    field_nationality : [{ value: values.nationality }],
    field_address : [{ value: values.address }],
    field_city : [{ value: values.city }],
    field_postalcode : [{ value: values.postalcode }],
    field_province : [{ value: values.province }],
    field_country : [{ value: values.country }],
    field_phonenumber : [{ value: values.phonenumber }],
    field_tasks : [{ value: values.tasks }],
    field_companies : values.companies.map((i) => ({ value: i })),
  };

  const headers = buildHeaders(true);
  return clearCookies().then(() => {
    return api.patch(`${Config.API_URL}/user/${id}?_format=hal_json`, data, { headers })
      .then((response) => response.data);
  });
}

export function getUserRequest(id) {
  const headers = buildHeaders(false);
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/user/${id}?_format=json`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function getNewsRequest() {
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/news`)
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function getNewRequest(id) {
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/news/${id}`)
      .then((response) => {
        const [item] = response.data;
        return item;
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function setEnrollmentRequest(values) {
  const data = {
    _links: {
      type: {
        href: `${Config.API_URL}/rest/type/user/user`
      }
    },
    name : [{ value: values.username }],
    field_firstname : [{ value: values.firstname }],
    field_lastname : [{ value: values.lastname }],
    mail : [{ value: values.mail }],
    field_cuit : [{ value: values.cuit }],
    field_dni : [{ value: values.dni }],
    field_birthdate : [{ value: values.birthdate }],
    field_nationality : [{ value: values.nationality }],
    field_address : [{ value: values.address }],
    field_city : [{ value: values.city }],
    field_postalcode : [{ value: values.postalcode }],
    field_province : [{ value: values.province }],
    field_country : [{ value: values.country }],
    field_phonenumber : [{ value: values.phonenumber }],
    field_tasks : [{ value: values.tasks }],
    field_companies : values.companies.map((i) => ({ value: i })),
  };

  const headers = registerBuildHeaders(true);
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/user/register?_format=hal_json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function changeUserPass(id, data) {
  return clearCookies().then(() => {
    return api.put(`${Config.API_URL}/users/${id}`, { pass: data })
      .then((response) => response.data);
  });
}

export function getComplaintsRequest() {
  const headers = buildHeaders(false);
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/complaints`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function getAlertsRequest() {
  const headers = buildHeaders(false);
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/alerts`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function setAlertRequest(values) {
  const data = {
    _links: {
      type: {
        href: `${Config.API_URL}/rest/type/node/alerts`,
      },
    },
    type: [{target_id: 'alerts'}],
    title: [{value: 'Alert'}],
    body: [{value: values.description}],
    field_alert_type: [{value: values.type}],
    field_company: [{value: values.company}],
    field_location: [{lat: values.location.latitude, lng: values.location.longitude}],
  }

  const headers = buildHeaders(true);
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/node?_format=hal_json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

/**
 * Returns an object with headers for api requests.
 *
 * If post is true build the headers for post request, using
 * application/hal+json and adding the csrf_token.
 */
function buildHeaders(post = false) {
  const state = store.getState();

  var headers = {
    Cookie: `${state.user.cookie.name}=${state.user.cookie.value}`,
    'Content-Type': 'application/json',
  };

  if (post) {
    headers['Content-Type'] = 'application/hal+json';
    const { authToken } = getTokens();
    headers['X-CSRF-Token'] = authToken;
  }

  return headers;
}

/**
 * Returns an object with headers for api requests.
 *
 * If post is true build the headers for post request, using
 * application/octet-stream and adding Content-Disposition.
 */
function buildHeadersPhotoPost(post = false) {
  const state = store.getState();

  var headers = {
    Cookie: `${state.user.cookie.name}=${state.user.cookie.value}`,
    'Content-Type': 'application/octet-stream',
  };

  if (post) {
    headers['Content-Type'] = 'application/octet-stream';
    const { authToken } = getTokens();
    headers['X-CSRF-Token'] = authToken;
    // FIXME: nombre del archivo.
    headers['Content-Disposition'] = 'file; filename="filename.jpg"';
  }

  return headers;
}

export function setComplaintFileRequest(values) {
  let photo = values.photo

  const headers = buildHeadersPhotoPost(true);
  const uri = `${Config.API_URL}/file/upload/node/complaints/field_complaint_image?_format=json`;
  return clearCookies().then(() => {
    return RNFetchBlob.fetch('POST', uri, headers, RNFetchBlob.wrap(`file://${values.uri}`))
      .then((response) => {
        const data = JSON.parse(response.data);
        return data.fid[0].value;
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function patchComplaintRequest(values, fid) {
  const data = {
    _links: {
      type: {
        href: `${Config.API_URL}/rest/type/node/complaints`
      }
    },
    type: [{ target_id: 'complaints' }],
    // FIXME: Título de la denuncia.
    title: [{ value: "Complaint PRUEBA" }],
    field_address_complaint: [{ value: values.address }],
    field_company_complaint: [{ value: values.company }],
    field_tasks: [{ value: values.tasks }],
    field_firstname: [{ value: values.firstname }],
    field_lastname: [{ value: values.lastname }],
    field_email: [{ value: values.email }],
    field_phonenumber: [{ value: values.phonenumber }],
    field_problem: [{ value: values.problem }],
    field_seniority: [{ value: values.seniority }],
    field_description: [{ value: values.description }],
    field_complaint_image: [
      {
        target_id: fid,
      }
    ]
}

  const headers = buildHeaders(true);
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/node?_format=json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}
