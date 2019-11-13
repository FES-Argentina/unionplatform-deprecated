import { all } from 'redux-saga/effects';
import { documentsWatcher, documentWatcher } from './documents';
import { loginFlow } from './user';

export default function* rootSaga() {
  yield all([
    documentsWatcher(),
    documentWatcher(),
    loginFlow(),
  ]);
}
