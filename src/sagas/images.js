import { all, call, put, take } from 'redux-saga/effects';
import { GET_COMPLAINT_IMAGES } from '../constants';
import { getComplaintImagesSuccess } from '../actions/images';
import { processing } from '../actions';
import { getLocalImage } from '../utils/images';

function* complaintImagesWorker(complaint) {
  try {
    yield put(processing(true));
    const images = yield all(complaint.image.map((img) => getLocalImage(img)));
    yield put(getComplaintImagesSuccess(images));
  } catch (e) {
    console.log('EXCEPTION', e);
  } finally {
    yield put(processing(false));
  }
}

export function* complaintImagesWatcher() {
  while (true) {
    const { complaint } = yield take(GET_COMPLAINT_IMAGES, complaintImagesWorker);
    yield call(complaintImagesWorker, complaint)
  }
}
