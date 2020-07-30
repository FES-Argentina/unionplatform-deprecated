import { GET_DOCUMENTS, GET_DOCUMENTS_SUCCESS } from '../constants';

const initialState = {
  list: [],
  loading: false,
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        loading: true,
      };

    case GET_DOCUMENTS_SUCCESS:
      const { payload, offset } = action;
      return {
        ...state,
        list: offset > 0 ? [...state.list, ...payload] : payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default documentsReducer;
