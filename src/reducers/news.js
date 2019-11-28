import { GET_NEWS_SUCCESS, GET_NEW_SUCCESS } from '../constants';

const initialState = {
  list: [],
  item: {},
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case GET_NEW_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
