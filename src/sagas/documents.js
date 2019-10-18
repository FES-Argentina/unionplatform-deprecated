import {put, takeLatest} from 'redux-saga/effects'

import {FETCH_DOCUMENTS} from '../constants'
import {getDocuments} from '../actions/documents'

export function* documentsWatcher() {
  yield takeLatest(FETCH_DOCUMENTS, documentsWorker)
}

function* documentsWorker(action) {
  var documents = [
    {title: 'Documento 1', description: 'Descripción del documento 1', id: '1'},
    {title: 'Documento 2', description: 'Descripción del documento 2', id: '2'},
    {title: 'Documento 3', description: 'Descripción del documento 3', id: '3'},
    {title: 'Documento 4', description: 'Descripción del documento 4', id: '4'},
    {title: 'Documento 5', description: 'Descripción del documento 5', id: '5'},
    {title: 'Documento 6', description: 'Descripción del documento 6', id: '6'},
  ]
  // TODO: Get the documents from the backend.

  // Dispatch the getDocuments actions to the store.
  yield put(getDocuments(documents))
}
