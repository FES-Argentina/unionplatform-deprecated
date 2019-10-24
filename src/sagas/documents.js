import { call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_DOCUMENTS } from '../constants';
import { getDocuments } from '../actions/documents';
import { getDocumentsRequest } from '../api';

function* documentsWorker() {
  try {
    const documents = yield call(getDocumentsRequest);

    // Dispatch the getDocuments actions to the store.
    yield put(getDocuments(documents));
  } catch (e) {
    console.log('EXCEPTION', e);
  }
}

export function* documentsWatcher() {
  yield takeLatest(FETCH_DOCUMENTS, documentsWorker);
}
