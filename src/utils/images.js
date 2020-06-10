import RNFetchBlob from 'rn-fetch-blob';
import { v5 as uuid } from 'uuid';
import Config from 'react-native-config';
import { downloadImage } from '../api';

/**
 * Ensures the local copy of remoteImage, returns a Promise that resolves to
 * a 'tuple' with remoteImage and local path.
 */
export function getLocalImage(remoteImage) {
  const filename = uuid(remoteImage, '65b32c6c-ea6a-423c-a6ac-fc4da67441fb');
  const path = `${RNFetchBlob.fs.dirs.CacheDir}/${filename}.${remoteImage.split('.').pop()}`;

  return RNFetchBlob.fs.exists(path)
    .then((exists) => (exists) ? Promise.resolve([remoteImage, path]) : downloadImage(remoteImage, path));
}
