import { GET_ALERTS, GET_ALERTS_SUCCESS, SET_ALERT, SET_ALERT_SUCCESS, } from '../constants';

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

export function setAlert(values) {
  return {
    type: SET_ALERT,
    data: values,
  };
}

export function setAlertSuccess(alert) {
  return {
    type: SET_ALERT_SUCCESS,
    alerts: alert,
  };
}
