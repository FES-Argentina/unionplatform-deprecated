import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_COMPLAINTS_SUCCESS } from '../constants';
import { getComplaintImagesSuccess } from '../actions/images';
import { processing } from '../actions';
import { getLocalImage } from '../utils/images';

function* complaintImagesWorker(action) {
  try {
    yield put(processing(true));
    const images = action.payload.map((complaint) => complaint.image).flat();
    const cache = yield all(images.map((img) => getLocalImage(img)));
    yield put(getComplaintImagesSuccess(cache));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* complaintImagesWatcher() {
  yield takeLatest(GET_COMPLAINTS_SUCCESS, complaintImagesWorker);
}
