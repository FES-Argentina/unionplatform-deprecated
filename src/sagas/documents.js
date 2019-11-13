import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';

import { FETCH_DOCUMENTS, FETCH_DOCUMENT } from '../constants';
import { getDocuments, getDocument } from '../actions/documents';
import { getDocumentsRequest, getDocumentRequest } from '../api';

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

export function* documentWatcher() {
  while (true) {
    const { id } = yield take(FETCH_DOCUMENT);

    try {
      const document = yield call(getDocumentRequest, id);
      console.warn(document);

      // Dispatch the getDocument action to the store.
      yield put(getDocument(document));
    } catch (e) {
      console.log('EXCEPTION', e);
    }
  }
}
