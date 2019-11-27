import { SET_AUTH, UPDATE_USER_SUCCESS, GET_USER } from '../constants';

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
    default:
      return state;
  }
};

export default userReducer;
