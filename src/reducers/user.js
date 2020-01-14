import { GET_USER_SUCCESS, LOGOUT_REQUEST, SET_AUTH, UPDATE_USER_SUCCESS, SET_ENROLLMENT_SUCCESS, SET_COMPLAINT_SUCCESS, CHANGE_USER_PASS_SUCCESS, GET_COMPLAINTS_SUCCESS } from '../constants';

const initialState = {
  authToken: null,
  logoutToken: null,
  cookie: null,
  user: {},
  item: {},
  enrollments: [],
  complaints: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authToken: action.tokens.csrf,
        logoutToken: action.tokens.logout,
        cookie: action.cookie,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: state.user,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };
    case SET_ENROLLMENT_SUCCESS:
      return {
        ...state,
        enrollments: action.payload,
      };
    case SET_COMPLAINT_SUCCESS:
      return {
        ...state,
        complaints: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        user: {},
        item: {},
      }
    case CHANGE_USER_PASS_SUCCESS:
      return {
        ...state,
        user: state.user,
      };
    case GET_COMPLAINTS_SUCCESS:
      return {
        ...state,
        complaints: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
