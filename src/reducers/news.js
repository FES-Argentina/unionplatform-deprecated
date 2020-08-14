import { GET_NEWS, GET_NEWS_SUCCESS } from '../constants';

const initialState = {
  list: [],
  loading: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        loading: true,
      };

    case GET_NEWS_SUCCESS:
      const { payload, offset } = action;
      return {
        ...state,
        list: offset > 0 ? [...state.list, ...payload] : payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default newsReducer;
