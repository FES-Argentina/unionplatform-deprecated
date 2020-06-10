import RNFetchBlob from 'rn-fetch-blob';
import { v5 as uuid } from 'uuid';
import Config from 'react-native-config';
import { downloadImage } from '../api';

/**
 * Ensures the local copy of remoteImage, returns a Promise that resolves to
 * the local path for the image.
 */
export function getLocalImage(remoteImage) {
  const url = `${Config.API_URL}${remoteImage}`;
  const filename = uuid(url, '65b32c6c-ea6a-423c-a6ac-fc4da67441fb');
  const path = `${RNFetchBlob.fs.dirs.CacheDir}/${filename}.${remoteImage.split('.').pop()}`;

  return RNFetchBlob.fs.exists(path)
    .then((exists) => (exists) ? Promise.resolve(path) : downloadImage(url, path));
}
