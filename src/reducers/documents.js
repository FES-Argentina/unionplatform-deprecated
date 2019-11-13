import { GET_DOCUMENTS, GET_DOCUMENT } from '../constants';

const initialState = {
  list: [],
  item: {},
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        list: action.payload,
      };

    case GET_DOCUMENT:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
};

export default documentsReducer;
