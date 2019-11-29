import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';

import { GET_NEWS, GET_NEW } from '../constants';
import { processing } from '../actions';
import { getNewsSuccess, getNewSuccess } from '../actions/news';
import { getNewsRequest, getNewRequest } from '../api';

function* newsWorker() {
  try {
    yield put(processing(true));
    const news = yield call(getNewsRequest);

    // Dispatch the getNews actions to the store.
    yield put(getNewsSuccess(news));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* newsWatcher() {
  yield takeLatest(GET_NEWS, newsWorker);
}

export function* newWatcher() {
  while (true) {
    const { id } = yield take(GET_NEW);

    try {
      yield put(processing(true));
      const newItem = yield call(getNewRequest, id);
      console.warn(newItem);

      // Dispatch the getNew action to the store.
      yield put(getNewSuccess(newItem));
    } catch (e) {
      console.log('EXCEPTION', e);
    } finally {
      yield put(processing(false));
    }
  }
}
