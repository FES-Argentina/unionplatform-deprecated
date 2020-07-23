import { call, take, takeLatest, fork } from 'redux-saga/effects';
import { SEND_FCM_TOKEN } from '../constants';
import { postDeviceToken } from '../api';

export function* setDeviceToken() {
  while (true) {
    const data = yield take(SEND_FCM_TOKEN);
    yield call(postDeviceToken, data.user, data.token);
  }
}
