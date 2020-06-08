import { GET_INFORMATION_SUCCESS } from '../constants';

const initialState = {
  information: {},
};

const informationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFORMATION_SUCCESS:
      return {
        ...state,
        information: action.payload,
      };
    default:
      return state;
  }
};

export default informationReducer;
