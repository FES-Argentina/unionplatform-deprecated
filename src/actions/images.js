import { GET_COMPLAINT_IMAGES_SUCCESS } from '../constants';

export function getComplaintImagesSuccess(images) {
  return {
    type: GET_COMPLAINT_IMAGES_SUCCESS,
    payload: images,
  };
}
