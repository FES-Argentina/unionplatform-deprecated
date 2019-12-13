import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_ALERTS } from '../constants';
import { getAlertsSuccess } from '../actions/alerts';
import { processing } from '../actions';
import { getAlertsRequest } from '../api';

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
