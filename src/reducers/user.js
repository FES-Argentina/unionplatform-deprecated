import { GET_USER, LOGOUT_REQUEST, SET_AUTH, UPDATE_USER_SUCCESS } from '../constants';

const initialState = {
  authToken: null,
  user: {},
  item: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authToken: action.authToken,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: state.user,
      };
    case GET_USER:
      return {
        ...state,
        item: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        user: {},
        item: {},
      }
    default:
      return state;
  }
};

export default userReducer;
