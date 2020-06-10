import { GET_COMPLAINT_IMAGES_SUCCESS } from '../constants';

const initialState = {
  cache: {},
};

const imageCacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPLAINT_IMAGES_SUCCESS:
      const cache = action.payload.reduce((dict, value) => {
        dict[value[0]] = value[1];
        return dict;
      }, {});
      return {
        cache: { ...state.cache, ...cache },
      };

    default:
      return state;
  }
};

export default imageCacheReducer;
