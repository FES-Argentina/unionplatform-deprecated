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
import NavigationService from '../navigation/navigationService';


/**
 * Effect to redirect the user after logging in.
 */
function* redirectLogin() {
  NavigationService.navigate('Authenticated');
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
    yield put(setAuth(result.token));
    yield call(redirectLogin);
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
