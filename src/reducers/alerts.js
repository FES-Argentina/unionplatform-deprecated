import { GET_ALERTS_SUCCESS } from '../constants';

const initialState = {
  list: [],
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

export default alertsReducer;
