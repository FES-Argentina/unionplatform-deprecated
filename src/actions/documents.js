import { GET_DOCUMENTS, GET_DOCUMENTS_SUCCESS } from '../constants';

export function getDocuments(offset) {
  return {
    type: GET_DOCUMENTS,
    offset,
  };
}


export function getDocumentsSuccess(docs, offset) {
  return {
    type: GET_DOCUMENTS_SUCCESS,
    payload: docs,
    offset,
  };
}
