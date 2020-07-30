import { call, put, takeLatest, take } from 'redux-saga/effects';
import { GET_DOCUMENTS } from '../constants';
import { getDocumentsSuccess } from '../actions/documents';
import { processing  } from '../actions';
import { getDocumentsRequest } from '../api';

export function* documentsWatcher() {
  while (true) {
    const { page } = yield take(GET_DOCUMENTS);

    try {
      yield put(processing(true));
      const documents = yield call(getDocumentsRequest, page);
      
      yield put(getDocumentsSuccess(documents));
    } catch (e) {
      console.log('EXCEPTION', e);
    } finally {
      yield put(processing(false));
    }
  }
}
