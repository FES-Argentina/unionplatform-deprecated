import { GET_ALERTS_SUCCESS, SET_ALERT_SUCCESS } from '../constants';

const initialState = {
  list: [],
  alerts: [],
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case SET_ALERT_SUCCESS:
      return {
        ...state,
        alerts: action.payload,
      };
    default:
      return state;
  }
};

export default alertsReducer;
