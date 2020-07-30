import { call, put, takeLatest, take } from 'redux-saga/effects';
import { GET_NEWS } from '../constants';
import { processing } from '../actions';
import { getNewsSuccess } from '../actions/news';
import { getNewsRequest } from '../api';

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
