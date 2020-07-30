import { GET_NEWS_SUCCESS } from '../constants';

const initialState = {
  list: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};

export default newsReducer;
