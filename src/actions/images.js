import { GET_COMPLAINT_IMAGES, GET_COMPLAINT_IMAGES_SUCCESS } from '../constants';

export function getComplaintImages(complaint) {
  return {
    type: GET_COMPLAINT_IMAGES,
    complaint,
  };
}

export function getComplaintImagesSuccess(images) {
  return {
    type: GET_COMPLAINT_IMAGES_SUCCESS,
    payload: images,
  };
}
