import { all, call, put, race, take, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  UPDATE_USER,
  GET_USER,
  SET_ENROLLMENT,
  SET_COMPLAINT,
  CHANGE_USER_PASS,
  GET_COMPLAINTS,
  GET_INFORMATION,
  RESET_USER_PASS,
} from '../constants';
import { requestError, processing } from '../actions';
import {
  setAuth,
  setLogout,
  updateUserSuccess,
  getUserSuccess,
  setEnrollmentSuccess,
  setComplaintSuccess,
  getComplaintsSuccess,
  changeUserPassSuccess,
} from '../actions/user';
import {
  login,
  logout,
  updateUser,
  getUserRequest,
  setEnrollmentRequest,
  setComplaintRequest,
  setComplaintFileRequest,
  updateComplaintRequest,
  changeUserPass,
  changePasswordWithToken,
  requestNewPassword,
  getComplaintsRequest,
  patchComplaintRequest,
  getInformationRequest,
} from '../api';
import { getInformationSuccess } from '../actions/information';
import NavigationService from '../navigation/NavigationService';
import Toast from 'react-native-simple-toast';


/**
 * Effect to redirect the user after logging in or out.
 */
function redirectAuth() {
  NavigationService.navigate('Loading');
}

/**
 * Effect to handle authorization.
 *
 * @param {string} username The user name.
 * @param {string} password The user password.
 */
export function* authorize({ username, password }) {
  // Let the app know we a re sending a request.
  yield put(processing(true));
  try {
    const result = yield call(login, username, password);
    return result;
  } catch (error) {
    yield put(requestError(error));
    return false;
  } finally {
    yield put(processing(false));
  }
}

/**
 * Log in saga, watching for a LOGIN_REQUEST.
 */
export function* loginFlow() {
  while (true) {
    const request = yield take(LOGIN_REQUEST);
    const { username, password } = request.data;

    const winner = yield race({
      auth: call(authorize, { username, password }),
      logout: take(LOGOUT_REQUEST),
    });

    if (winner.auth) {
      yield put(setAuth(winner.auth));
      const user = yield call(getUserRequest, winner.auth.data.current_user.uid);
      yield put(getUserSuccess(user));
      yield call(redirectAuth);
    }
  }
}

/**
 * Log out saga, watching for a LOGOUT_REQUEST.
 */
export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield put(processing(true));
    try {
      yield call(logout);
    }
    catch (e) {
      console.log('No se pudo cerrar sesión en el backend.');
    }
    finally {
      yield put(setLogout());
      yield put(processing(false));
      yield call(redirectAuth);
    }
  }
}

/**
 * UPDATE_USER
 */
function* updateUserWorker(id, newValues) {
  try {
    yield put(processing(true));
    const data = yield call(updateUser, id, newValues);
    if (data) {
      yield put(updateUserSuccess(newValues));
      NavigationService.navigate('Profile');
      Toast.show('Gracias! Tu perfil fue actualizado.', Toast.LONG);
    }
  } catch (e) {
    console.warn('error updateUserWorker:', e);
  }
  finally {
    yield put(processing(false));
  }
}

export function* updateUserWatcher() {
  while (true) {
    const { data } = yield take(UPDATE_USER);
    const { id, newValues } = data;

    try {
      yield call(updateUserWorker, id, newValues);
    } catch (e) {
      console.warn('error updateUserWatcher:', e);
    }
  }
}

/**
 * GET_USER
 */
export function* userWatcher() {
  while (true) {
    const { id } = yield take(GET_USER);

    try {
      yield put(processing(true));
      const user = yield call(getUserRequest, id);

      yield put(getUserSuccess(user));
    } catch (e) {
      console.log('EXCEPTION', e);
    } finally {
      yield put(processing(false));
    }
  }
}

/**
 * SET_ENROLLMENT
 */

function* setEnrollmentWorker(values) {
  try {
    yield put(processing(true));
    yield call(setEnrollmentRequest, values);
    Alert.alert('Gracias por registrarte!', 'Vas a recibir un correo cuando tu solicitud sea revisada.');
    NavigationService.navigate('Welcome');
  } catch (e) {
    Alert.alert('Lo sentimos, ocurrió un error en el registro.', 'Por favor intentá más tarde o ponete en contacto con nosotrxs.');
  }
  finally {
    yield put(processing(false));
  }
}


export function* setEnrollmentWatcher() {
  while (true) {
    const { data } = yield take(SET_ENROLLMENT);
    try {
      yield call(setEnrollmentWorker, data);
    } catch (e) {
      console.warn('error setEnrollmentWatcher:', e);
    }
  }
}

/**
 * CHANGE_USER_PASS_USER
 */
function* changeUserPassWorker(id, newValues) {
  try {
    const data = yield call(changeUserPass, id, newValues);
    if (data) {
      yield put(changeUserPassSuccess(newValues));
      NavigationService.navigate('Login');
    }
  } catch (e) {
    console.warn('error changeUserPassWorker:', e);
  }
}

export function* changeUserPassWatcher() {
  while (true) {
    const { data } = yield take(CHANGE_USER_PASS);
    const { id, newValues } = data;

    try {
      yield call(changeUserPassWorker, id, newValues);
    } catch (e) {
      console.warn('error changeUserPassWatcher:', e);
    }
  }
}

function* resetUserPassWorker({ password, credentials }) {
  try {
    yield put(processing(true));
    yield call(changePasswordWithToken, password, credentials);
    Toast.show('Contraseña cambiada, por favor iniciá sesión.', Toast.LONG);
    NavigationService.navigate('Login', {}, true);
  } catch (e) {
    Alert.alert('Lo sentimos, ocurrió un error', 'Ocurrió un error al cambiar la contraseña. Por favor intentá con un nuevo enlace.');
    NavigationService.navigate('Loading');
  } finally {
    yield put(processing(false));
  }
}

export function* resetUserPassWatcher() {
  yield takeLatest(RESET_USER_PASS, resetUserPassWorker);
}

function* newPasswordWorker({ data }) {
  try {
    yield(put(processing(true)));
    yield call(requestNewPassword, data);
    Alert.alert('Gracias', 'Recibirás un correo electrónico con instrucciones para cambiar tu contraseña.');
    NavigationService.navigate('Loading');
  } catch (error) {
    yield put(requestError(error));
  } finally {
    yield put(processing(false));
  }
}

export function* newPasswordWatcher() {
  yield takeLatest('REQUEST_NEW_PASS', newPasswordWorker);
}

/**
 * GET_COMPLAINTS
 */
function* complaintsWorker() {
  try {
    yield put(processing(true));
    const complaints = yield call(getComplaintsRequest);

    yield put(getComplaintsSuccess(complaints));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* complaintsWatcher() {
  yield takeLatest(GET_COMPLAINTS, complaintsWorker);
}

/**
 * SET_COMPLAINT
 */
function* setComplaintWorker(values) {
  try {
    yield put(processing(true));
    let error = false;
    let fid = null;
    let arrayFid = [];
    if (values.photo) {
      for (var i = 0; i < values.photo.length; i++) {
        values.photo[i]
        fid = yield call(setComplaintFileRequest, values.photo[i]);
        arrayFid.push(fid)
      }
      if (arrayFid.length == 0) {
        error = true;
        Toast.show('No se pudo subir la imagen.', Toast.LONG);
      }
    }

    if (!error) {
      const dataPatch = yield call(patchComplaintRequest, values, arrayFid);

      if (dataPatch) {
        yield put(setComplaintSuccess(values));
        Toast.show('Tu denuncia fue creada.', Toast.LONG);
        NavigationService.navigate('ComplaintsInfo');
      } else {
        Toast.show('No se pudo crear la denuncia...', Toast.LONG);
      }
    }
  } catch (e) {
    Toast.show('No se pudo crear la denuncia...', Toast.LONG);
    console.error('setComplaintWorker:', e);
  }
  finally {
    yield put(processing(false));
  }
}

export function* setComplaintWatcher() {
  while (true) {
    const { data } = yield take(SET_COMPLAINT);
    try {
      yield call(setComplaintWorker, data);
    } catch (e) {
      console.warn('error setComplaintWatcher:', e);
    }
  }
}

function* informationWorker() {
  try {
    yield put(processing(true));
    let information = yield call(getInformationRequest)
    yield put(getInformationSuccess(information))
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* informationWatcher() {
  yield takeLatest(GET_INFORMATION, informationWorker);
}
