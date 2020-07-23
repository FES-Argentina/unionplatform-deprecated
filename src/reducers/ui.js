import { PROCESSING } from '../constants';

const initialState = {
  processing: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROCESSING:
      return {
        ...state,
        processing: action.status,
      };
    default:
      return state;
  }
};

export default uiReducer;
