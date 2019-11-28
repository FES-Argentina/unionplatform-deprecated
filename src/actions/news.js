import {
  GET_NEWS, GET_NEWS_SUCCESS, GET_NEW, GET_NEW_SUCCESS,
} from '../constants';

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

export function getNew(id) {
  return {
    type: GET_NEW,
    id,
  };
}

export function getNewSuccess(newItem) {
  return {
    type: GET_NEW_SUCCESS,
    payload: newItem,
  };
}
