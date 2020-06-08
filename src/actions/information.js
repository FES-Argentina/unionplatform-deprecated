import { GET_INFORMATION, GET_INFORMATION_SUCCESS } from '../constants';

export function getInformation() {
  return {
    type: GET_INFORMATION,
  };
}

export function getInformationSuccess(information) {
  return {
    type: GET_INFORMATION_SUCCESS,
    payload: information,
  };
}
