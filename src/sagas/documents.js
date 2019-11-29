import {
  call, put, takeLatest, take,
} from 'redux-saga/effects';

import { GET_DOCUMENTS, GET_DOCUMENT } from '../constants';
import { getDocumentsSuccess, getDocumentSuccess } from '../actions/documents';
import { processing  } from '../actions';
import { getDocumentsRequest, getDocumentRequest } from '../api';

function* documentsWorker() {
  try {
    yield put(processing(true));
    const documents = yield call(getDocumentsRequest);

    // Dispatch the getDocuments actions to the store.
    yield put(getDocumentsSuccess(documents));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* documentsWatcher() {
  yield takeLatest(GET_DOCUMENTS, documentsWorker);
}

export function* documentWatcher() {
  while (true) {
    const { id } = yield take(GET_DOCUMENT);

    try {
      yield put(processing(true));
      const document = yield call(getDocumentRequest, id);

      // Dispatch the getDocument action to the store.
      yield put(getDocumentSuccess(document));
    } catch (e) {
      console.log('EXCEPTION', e);
    } finally {
      yield put(processing(false));
    }
  }
}
