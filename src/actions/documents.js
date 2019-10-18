import {FETCH_DOCUMENTS, GET_DOCUMENTS} from '../constants'

export function fetchDocuments() {
  return {
    type: FETCH_DOCUMENTS,
  }
}

export function getDocuments(docs) {
  return {
    type: GET_DOCUMENTS,
    payload: docs,
  }
}
