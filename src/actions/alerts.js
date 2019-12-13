import { GET_ALERTS, GET_ALERTS_SUCCESS } from '../constants';

export function getAlerts() {
  return {
    type: GET_ALERTS,
  };
}

export function getAlertsSuccess(alerts) {
  return {
    type: GET_ALERTS_SUCCESS,
    payload: alerts,
  };
}
