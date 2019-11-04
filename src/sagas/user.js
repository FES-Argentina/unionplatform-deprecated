import {
  call,
  put,
  race,
  take,
} from 'redux-saga/effects';

import { LOGIN_REQUEST, LOGOUT } from '../constants';
import { requestError, sendingRequest } from '../actions';
import { setAuth } from '../actions/user';
import { login } from '../api';

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
    yield put(setAuth(result.token));
  } catch (error) {
    yield put(requestError(error.message));
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
      logout: take(LOGOUT),
    });
  }
}
