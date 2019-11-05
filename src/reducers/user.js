import { SET_AUTH } from '../constants';

const initialState = {
  authToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authToken: action.authToken,
      };

    default:
      return state;
  }
};

export default userReducer;
