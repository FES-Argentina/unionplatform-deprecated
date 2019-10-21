import axios from 'axios'

// FIXME: Keep this as config somewhere else.
const API_URL = 'http://10.0.2.2:3000'

export function getDocumentsRequest() {
  return axios.get(API_URL + '/documents')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log('ERROR', error)
    })
}
