import { call, put, takeLatest, take } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import { GET_DOCUMENTS } from '../constants';
import { getDocumentsSuccess } from '../actions/documents';
import { processing  } from '../actions';
import { getDocumentsRequest } from '../api';

export function* documentsWatcher() {
  while (true) {
    const { offset } = yield take(GET_DOCUMENTS);

    try {
      const documents = yield call(getDocumentsRequest, offset);
      yield put(getDocumentsSuccess(documents, offset));
    } catch (e) {
      Toast.show('No se pudieron cargar los documentos.', Toast.LONG);
    }
  }
}
