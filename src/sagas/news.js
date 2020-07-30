import { call, put, takeLatest, take } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import { GET_NEWS } from '../constants';
import { processing } from '../actions';
import { getNewsSuccess } from '../actions/news';
import { getNewsRequest } from '../api';

export function* newsWatcher() {
  while (true) {
    const { offset } = yield take(GET_NEWS);
    try {
      yield put(processing(true));
      const news = yield call(getNewsRequest, offset);

      yield put(getNewsSuccess(news, offset));
    } catch (e) {
      Toast.show('No se pudieron cargar las noticias.', Toast.LONG);
    } finally {
      yield put(processing(false));
    }
  }
}
