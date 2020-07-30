import { GET_NEWS, GET_NEWS_SUCCESS } from '../constants';

export function getNews() {
  return {
    type: GET_NEWS,
  };
}

export function getNewsSuccess(news) {
  return {
    type: GET_NEWS_SUCCESS,
    payload: news,
  };
}
