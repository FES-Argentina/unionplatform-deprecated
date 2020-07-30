import { GET_DOCUMENTS, GET_DOCUMENTS_SUCCESS } from '../constants';

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
