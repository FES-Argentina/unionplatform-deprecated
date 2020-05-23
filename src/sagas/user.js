import { call, put, race, take, takeLatest, fork } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  UPDATE_USER,
  GET_USER,
  SET_ENROLLMENT,
  SET_COMPLAINT,
  CHANGE_USER_PASS,
  GET_COMPLAINTS,
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
  getComplaintsRequest,
  patchComplaintRequest,
} from '../api';
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
    yield put(requestError(error.message));
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
    yield call(logout);
    yield put(setLogout());
    yield put(processing(false));
    yield call(redirectAuth);
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
    yield fork(setEnrollmentRequest, values);
    yield put(processing(false));
    Toast.show('Gracias por registrarte! Vas a recibir un correo cuando tu solicitud sea revisada.', Toast.LONG);
    NavigationService.navigate('Welcome');
  } catch (e) {
    console.warn('error setEnrollmentWorker:', e);
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
      // TODO: que tenemos que pasarle al changeUserPass
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

/**
 * GET_COMPLAINTS
 */
function* complaintsWorker() {
  try {
    yield put(processing(true));
    const complaints = yield call(getComplaintsRequest);

    // Dispatch the getComplaints actions to the store.
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
    // FIXME: Allow complaints without an image.
    yield put(processing(true));
    const fid = yield call(setComplaintFileRequest, values);
    const dataPatch = yield call(patchComplaintRequest, values, fid);

    if (dataPatch) {
      yield put(setComplaintSuccess(values));
      NavigationService.navigate('Loading');
      Toast.show('Tu denuncia fue creada.', Toast.LONG);
      NavigationService.navigate('ComplaintList');
    }
  } catch (e) {
    console.warn('error setComplaintWorker:', e);
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
