import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';
import { GET_ALERTS, SET_ALERT } from '../constants';
import { getAlertsSuccess, setAlertSuccess } from '../actions/alerts';
import { processing } from '../actions';
import { getAlertsRequest, setAlertRequest } from '../api';
import NavigationService from '../navigation/NavigationService';


function* alertsWorker() {
  try {
    yield put(processing(true));
    const alerts = yield call(getAlertsRequest);
    yield put(getAlertsSuccess(alerts));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* alertsWatcher() {
  yield takeLatest(GET_ALERTS, alertsWorker);
}

/**
 * SET_ALERT
 */
function* setAlertWorker(values) {
  try {
    const data = yield call(setAlertRequest, values);
    if (data) {
      // TODO: que tenemos que pasarle al setAlertSuccess
      yield put(setAlertSuccess(values));
      NavigationService.navigate('Welcome');
    }
  } catch (e) {
    console.warn('error setAlertWorker:', e);
  }
}

export function* setAlertWatcher() {
  while (true) {
    const { data } = yield take(SET_ALERT);
    try {
      yield call(setAlertWorker, data);
    } catch (e) {
      console.warn('error setAlertWatcher:', e);
    }
  }
}
