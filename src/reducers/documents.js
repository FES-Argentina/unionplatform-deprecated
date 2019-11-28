import { GET_DOCUMENTS_SUCCESS, GET_DOCUMENT_SUCCESS } from '../constants';

const initialState = {
  list: [],
  item: {},
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case GET_DOCUMENT_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
};

export default documentsReducer;
