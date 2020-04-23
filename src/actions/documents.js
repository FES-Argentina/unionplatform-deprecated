import {
  GET_DOCUMENTS, GET_DOCUMENTS_SUCCESS, GET_DOCUMENT, GET_DOCUMENT_SUCCESS,
} from '../constants';

export function getDocuments(page) {
  return {
    type: GET_DOCUMENTS,
    page,
  };
}


export function getDocumentsSuccess(docs) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    payload: docs,
  };
}

export function getDocument(id) {
  return {
    type: GET_DOCUMENT,
    id,
  };
}

export function getDocumentSuccess(doc) {
  return {
    type: GET_DOCUMENT_SUCCESS,
    payload: doc,
  };
}
