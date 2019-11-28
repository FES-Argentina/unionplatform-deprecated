import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';

import { GET_DOCUMENTS, GET_DOCUMENT } from '../constants';
import { getDocumentsSuccess, getDocumentSuccess } from '../actions/documents';
import { getDocumentsRequest, getDocumentRequest } from '../api';

function* documentsWorker() {
  try {
    const documents = yield call(getDocumentsRequest);

    // Dispatch the getDocuments actions to the store.
    yield put(getDocumentsSuccess(documents));
  } catch (e) {
    console.log('EXCEPTION', e);
  }
}

export function* documentsWatcher() {
  yield takeLatest(GET_DOCUMENTS, documentsWorker);
}

export function* documentWatcher() {
  while (true) {
    const { id } = yield take(GET_DOCUMENT);

    try {
      const document = yield call(getDocumentRequest, id);
      console.warn(document);

      // Dispatch the getDocument action to the store.
      yield put(getDocumentSuccess(document));
    } catch (e) {
      console.log('EXCEPTION', e);
    }
  }
}
