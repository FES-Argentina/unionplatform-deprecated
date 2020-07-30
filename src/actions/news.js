import { GET_NEWS, GET_NEWS_SUCCESS } from '../constants';

export function getNews(offset) {
  return {
    type: GET_NEWS,
    offset,
  };
}

export function getNewsSuccess(news, offset) {
  return {
    type: GET_NEWS_SUCCESS,
    payload: news,
    offset,
  };
}
