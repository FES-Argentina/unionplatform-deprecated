import { SET_AUTH, UPDATE_USER_SUCCESS } from '../constants';

const initialState = {
  authToken: null,
  user: {},
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
    default:
      return state;
  }
};

export default userReducer;
