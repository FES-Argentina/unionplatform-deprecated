import { all } from 'redux-saga/effects';
import { documentsWatcher } from './documents';

export default function* rootSaga() {
  yield all([
    documentsWatcher(),
  ]);
}
