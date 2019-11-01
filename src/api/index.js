import axios from 'axios';
import Config from 'react-native-config';

export function getDocumentsRequest() {
  return axios.get(`${Config.API_URL}/documents`)
    .then((response) => response.data)
    .catch((error) => {
      console.log('ERROR', error);
    });
}
