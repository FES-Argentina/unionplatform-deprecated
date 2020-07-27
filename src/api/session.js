import axios from 'axios';
import Config from 'react-native-config';
import { store } from '../store';
import { setAuthToken } from '../actions/user';
import Headers from './headers';

/**
 * Returns the current session cookie.
 */
export function getCookie() {
  const state = store.getState();
  return state.user.cookie;
}

/**
 * Returns the current session tokens (authToken and logoutToken).
 */
export function getCurrentTokens() {
  const state = store.getState();
  const { authToken, logoutToken } = state.user;
  return { authToken, logoutToken };
}

/**
 * Update the authorization token and return a promise that resolves to the
 * new token for immediate use.
 */
export function newAuthToken() {
  const headers = new Headers(Headers.types.APPLICATION_JSON).setCookie().build();
  return axios.get(`${Config.API_URL}/session/token`, { headers })
    .then((response) => {
      const token = response.data;
      store.dispatch(setAuthToken(token));
      return Promise.resolve(token);
    });
}
