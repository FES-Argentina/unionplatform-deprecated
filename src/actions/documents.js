import {
  FETCH_DOCUMENTS, GET_DOCUMENTS, FETCH_DOCUMENT, GET_DOCUMENT,
} from '../constants';

export function fetchDocuments() {
  return {
    type: FETCH_DOCUMENTS,
  };
}

export function getDocuments(docs) {
  return {
    type: GET_DOCUMENTS,
    payload: docs,
  };
}

export function fetchDocument(id) {
  return {
    type: FETCH_DOCUMENT,
    id,
  };
}

export function getDocument(doc) {
  return {
    type: GET_DOCUMENT,
    payload: doc,
  };
}
