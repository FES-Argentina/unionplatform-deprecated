import { GET_DOCUMENTS } from '../constants';

const initialState = {
  list: [],
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        list: [...state.list, ...action.payload],
      };

    default:
      return state;
  }
};

export default documentsReducer;
