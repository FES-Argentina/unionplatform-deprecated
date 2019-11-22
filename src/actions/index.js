import { CLEAR_ERRORS, REQUEST_ERROR, SENDING_REQUEST } from '../constants';

/**
 * Action creator for SENDING_REQUEST.
 *
 * @param {boolean} sending Wether the request is starting (true) or finishing (false).
 */
export function sendingRequest(sending) {
  return {
    type: SENDING_REQUEST,
    isSending: sending,
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
