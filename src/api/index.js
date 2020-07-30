import axios from 'axios';
import Config from 'react-native-config';
import SetCookieParser from 'set-cookie-parser';
import RCTNetworking from 'react-native/Libraries/Network/RCTNetworking';
import RNFetchBlob from 'rn-fetch-blob';
import Headers from './headers';
import { getCurrentTokens, newAuthToken } from './session';

const api = axios.create({
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (error.response.status === 403 && response.data.message === 'X-CSRF-Token request header is invalid') {
      return newAuthToken().then((token) => {
        const { config } = error;
        config.headers['X-CSRF-Token'] = token;

        return new Promise((resolve, reject) => {
          api.request(config)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            })
        });
      });
    }

    return Promise.reject(error);
  });

/**
 * Delete cookies.
 */
function clearCookies() {
  return new Promise((success) => {
    RCTNetworking.clearCookies(success);
  });
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

export function login(username, password) {
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/user/login?_format=json`, { name: username, pass: password })
      .then((response) => {
        var cookie = SetCookieParser(response.headers['set-cookie'], {decodeValues: true});
        return {
          data: response.data,
          cookie,
        };
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 400) {
          return Promise.reject('Credenciales incorrectas.');
        }
        const { data } = response;
        return Promise.reject(data.message ? data.message : error.message);
      });
  });
}

/**
 * Perform a one time login using the backend's password reset uri.
 */
export function oneTimeLogin(uid, token, timestamp) {
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/user/reset/${uid}/${timestamp}/${token}/login?_format=json`)
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
    const headers = new Headers(Headers.types.APPLICATION_JSON)
      .setCookie()
      .build();
    const { logoutToken } = getCurrentTokens();
    return api.post(`${Config.API_URL}/user/logout?_format=json&token=${logoutToken}`, null, { headers })
      .then((response) => response);
  });
}

export function loginStatus() {
  return clearCookies().then(() => {
    const headers = new Headers(Headers.types.APPLICATION_JSON)
      .setCookie()
      .build();
    return api.get(`${Config.API_URL}/user/login_status?_format=json`, { headers })
      .then((response) => response.data);
  });
}

/**
 * Request a password reset link, which will be sent to the user's email.
 */
export function requestNewPassword(value) {
  const data = {
    [value.includes('@') ? 'mail' : 'name']: value,
  };
  return clearCookies().then(() => {
    const headers = new Headers(Headers.types.APPLICATION_JSON).build();
    return api.post(`${Config.API_URL}/user/password?_format=json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        const { response } = error;
        if (response.status === 400) {
          return Promise.reject(response.data.message);
        }

        return Promise.reject(error.message);
      })
  });
}

/**
 * Change user password using a password reset token for validation.
 */
export function changePasswordWithToken(password, user) {
  const data = {
    _links : {
      type : {
        href : `${Config.API_URL}/rest/type/user/user`,
      },
    },
    pass: [{
      value: password,
    }],
  };

  const { id, token, cookie, authToken } = user;
  const headers = new Headers(Headers.types.APPLICATION_HAL_JSON)
    .setCookie(cookie)
    .setToken(authToken)
    .build();

  return clearCookies().then(() => {
    return api.patch(`${Config.API_URL}/user/${id}?_format=hal_json&pass-reset-token=${token}`, data, { headers })
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

  const headers = new Headers(Headers.types.APPLICATION_HAL_JSON)
    .setCookie()
    .setAuthToken()
    .build();
  return clearCookies().then(() => {
    return api.patch(`${Config.API_URL}/user/${id}?_format=hal_json`, data, { headers })
      .then((response) => response.data);
  });
}

export function getUserRequest(id) {
  const headers = new Headers(Headers.types.APPLICATION_JSON).setCookie().build();
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/user/${id}?_format=json`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function getNewsRequest(offset) {
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/news?offset=${offset}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

function postNewUser(values, sessionToken) {
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

  return clearCookies().then(() => {
    const headers = new Headers(Headers.types.APPLICATION_HAL_JSON).setToken(sessionToken).build();

    return api.post(`${Config.API_URL}/user/register?_format=hal_json`, data, { headers })
      .then((response) => response.data);
  });
}

export function setEnrollmentRequest(values) {
  return api.get(`${Config.API_URL}/session/token`).then((response) => {
    return postNewUser(values, response.data)
  });
}

export function changeUserPass(id, data) {
  return clearCookies().then(() => {
    return api.put(`${Config.API_URL}/users/${id}`, { pass: data })
      .then((response) => response.data);
  });
}

export function getComplaintsRequest() {
  const headers = new Headers(Headers.types.APPLICATION_JSON)
    .setCookie()
    .build();
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/complaints`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function getAlertsRequest() {
  const headers = new Headers(Headers.types.APPLICATION_JSON)
    .setCookie()
    .build();
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

  const headers = new Headers(Headers.types.APPLICATION_HAL_JSON)
    .setCookie()
    .setAuthToken()
    .build();
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/node?_format=hal_json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function setComplaintFileRequest(values) {
  const photo  = values[0];

  const headers = new Headers(Headers.types.APPLICATION_OCTET_STREAM)
    .setCookie()
    .setAuthToken()
    .setContentDisposition(photo.filename)
    .build();
  const uri = `${Config.API_URL}/file/upload/node/complaints/field_complaint_image?_format=json`;

  return clearCookies().then(() => {
    return RNFetchBlob.fetch('POST', uri, headers, RNFetchBlob.wrap(`file://${photo.uri}`))
      .then((response) => {
        const data = JSON.parse(response.data);
        if (response.respInfo.status == 201) {
          return data.fid[0].value;
        }
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function patchComplaintRequest(values, arrayFid) {
  let multipleFid = []
  for (var i = 0; i < arrayFid.length; i++) {
    let target =
      {
        target_id: arrayFid[i],
      }
    multipleFid.push(target)
  }
  const data = {
    _links: {
      type: {
        href: `${Config.API_URL}/rest/type/node/complaints`
      }
    },
    type: [{ target_id: 'complaints' }],
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
  }
  if (arrayFid) {
    data['field_complaint_image'] = multipleFid
  }

  const headers = new Headers(Headers.types.APPLICATION_HAL_JSON)
    .setCookie()
    .setAuthToken()
    .build();
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/node?_format=json`, data, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

/**
 * Downloads remoteImage into local cache dir and returns a Promise that resolves
 * to a 'tuple' with remoteImage and the path of the downloaded image.
 */
export function downloadImage(remoteImage, localPath) {
  const headers = new Headers().setCookie().build();
  const url = `${Config.API_URL}${remoteImage}`;

  return new Promise((resolve, reject) => {
    RNFetchBlob.config({ path: localPath })
      .fetch('GET', url, headers)
      .then((res) => resolve([remoteImage, res.path()]))
      .catch((err) => reject(err));
  });
}

export function getInformationRequest() {
  const headers = new Headers(Headers.types.APPLICATION_JSON)
    .setCookie()
    .build();
  return clearCookies().then(() => {
    return api.get(`${Config.API_URL}/information`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}

export function postDeviceToken(user, token) {
  const headers = new Headers(Headers.types.APPLICATION_HAL_JSON)
    .setCookie()
    .setAuthToken()
    .build();
  return clearCookies().then(() => {
    return api.post(`${Config.API_URL}/user/${user}/device_token?_format=hal_json`, `"${token}"`, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.log('ERROR', error);
      });
  });
}
