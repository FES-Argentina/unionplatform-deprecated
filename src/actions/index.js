import { CLEAR_ERRORS, PROCESSING, REQUEST_ERROR, SEND_FCM_TOKEN } from '../constants';

/**
 * Action creator for PROCESSING.
 *
 * @param {boolean} status Wether the process is starting (true) or finishing (false).
 */
export function processing(status) {
  return {
    type: PROCESSING,
    status: status,
  };
}

/**
 * Action creator for REQUEST_ERROR.
 *
 * @param {string} msg The error message.
 */
export function requestError(msg) {
  return {
    type: REQUEST_ERROR,
    message: msg,
  };
}

/**
 * Action creator for CLEAR_ERRORS.
 */
export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}

export function postFCMToken(token) {
  return {
    type: SEND_FCM_TOKEN,
    token,
  };
}
