import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';

import { GET_NEWS, GET_NEW } from '../constants';
import { getNewsSuccess, getNewSuccess } from '../actions/news';
import { getNewsRequest, getNewRequest } from '../api';

function* newsWorker() {
  try {
    const news = yield call(getNewsRequest);

    // Dispatch the getNews actions to the store.
    yield put(getNewsSuccess(news));
  } catch (e) {
    console.log('EXCEPTION', e);
  }
}

export function* newsWatcher() {
  yield takeLatest(GET_NEWS, newsWorker);
}

export function* newWatcher() {
  while (true) {
    const { id } = yield take(GET_NEW);

    try {
      const newItem = yield call(getNewRequest, id);
      console.warn(newItem);

      // Dispatch the getNew action to the store.
      yield put(getNewSuccess(newItem));
    } catch (e) {
      console.log('EXCEPTION', e);
    }
  }
}
