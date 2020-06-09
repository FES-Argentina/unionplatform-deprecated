import axios from 'axios';
import Config from 'react-native-config';
import { store } from '../store';

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
 * Get a session token from the backend.
 */
export function getSessionToken(){
  return api.get(`${Config.API_URL}/session/token`)
  .then((response) => response.data)
  .catch((error) => {
    console.log('ERROR', error);
  });
}

