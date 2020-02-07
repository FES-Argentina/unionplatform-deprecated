import {
  GET_USER_SUCCESS,
  SET_AUTH,
  UPDATE_USER_SUCCESS,
  SET_ENROLLMENT_SUCCESS,
  SET_COMPLAINT_SUCCESS,
  CHANGE_USER_PASS_SUCCESS,
  GET_COMPLAINTS_SUCCESS,
} from '../constants';
import { userFields } from '../api/mappings';
import { defaultProfile } from '../utils/defaults';

const initialState = {
  authToken: null,
  logoutToken: null,
  cookie: null,
  id: null,
  profile: defaultProfile,
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
        id: action.current_user ? action.current_user.id : null,
        profile: defaultProfile,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    case GET_USER_SUCCESS:
      let profile = {};
      const data = action.payload;
      // Flatten the returned data structure before storing.
      for (let [key, info] of Object.entries(userFields)) {
        if (data[key]) {
          if (data[key] && data[key].length && data[key][0][info.externalKey]) {
            if (data[key].length > 1) {
              profile[info.fieldName] = [];
              for (i = 0; i < data[key].length; i++) {
                profile[info.fieldName][i] = data[key][i][info.externalKey];
              }
            }
            else {
              profile[info.fieldName] = data[key][0][info.externalKey];
            }
          }
          else {
            profile[info.fieldName] = null;
          }
        }
      }
      return {
        ...state,
        profile: profile,
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
