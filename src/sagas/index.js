import { all } from 'redux-saga/effects';
import { documentsWatcher, documentWatcher } from './documents';
import { loginFlow, logoutFlow, updateUserWatcher } from './user';

export default function* rootSaga() {
  yield all([
    documentsWatcher(),
    documentWatcher(),
    loginFlow(),
    logoutFlow(),
    updateUserWatcher(),
  ]);
}
