import { all } from 'redux-saga/effects';
import { documentsWatcher, documentWatcher } from './documents';
import { newsWatcher, newWatcher } from './news';
import { loginFlow, logoutFlow, updateUserWatcher, userWatcher } from './user';

export default function* rootSaga() {
  yield all([
    documentsWatcher(),
    documentWatcher(),
    newsWatcher(),
    newWatcher(),
    loginFlow(),
    logoutFlow(),
    updateUserWatcher(),
    userWatcher(),
  ]);
}
