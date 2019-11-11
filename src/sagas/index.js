import { all } from 'redux-saga/effects';
import { documentsWatcher } from './documents';
import { loginFlow, logoutFlow } from './user';

export default function* rootSaga() {
  yield all([
    documentsWatcher(),
    loginFlow(),
    logoutFlow(),
  ]);
}
