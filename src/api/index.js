import axios from 'axios'
import Config from 'react-native-config'

console.log(Config)

export function getDocumentsRequest() {
  return axios.get(Config.API_URL + '/documents')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('ERROR', error)
    })
}
