import {
  call,
  put,
  race,
  take,
} from 'redux-saga/effects';

import { LOGIN_REQUEST, LOGOUT_REQUEST, UPDATE_USER } from '../constants';
import { requestError, sendingRequest } from '../actions';
import { setAuth, updateUserSuccessAction } from '../actions/user';
import { login, updateUser } from '../api';
import NavigationService from '../navigation/NavigationService';


/**
 * Effect to redirect the user after logging in or out.
 */
function* redirectAuth() {
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
  yield put(sendingRequest(true));
  try {
    const result = yield call(login, username, password);
    return result;
  } catch (error) {
    yield put(requestError(error.message));
    return false;
  } finally {
    yield put(sendingRequest(false));
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
      yield put(setAuth(winner.auth.token));
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
    yield put(setAuth(null));
    // TODO: Should we also close the session in the backend?
    yield call(redirectAuth);
  }
}

/**
 * UPDATE_USER
 */
function* updateUserWorker(id, newValues) {
  try {
    const data = yield call(updateUser, id, newValues);
    if (data) {
      // TODO: que tenemos que pasarle al updateUserAction
      yield put(updateUserSuccessAction(newValues));
      NavigationService.navigate('Profile');
    }
  } catch (e) {
    console.warn('error updateUserWorker:', e);
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
