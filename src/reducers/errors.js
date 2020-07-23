import { CLEAR_ERRORS, REQUEST_ERROR } from '../constants';

const initialState = {
  message: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ERROR:
      return {
        ...state,
        message: action.message,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default errorReducer;
