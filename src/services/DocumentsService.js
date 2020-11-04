import api from './api'

export default {
  fetchDocuments () {
    return api().get('documents')
  },
  addDocument (params) {
    return api().post('documents', params)
  }
}