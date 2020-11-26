import api from './api'

export default {
  fetchDocuments (limit) {
    return api().get(`documents${limit ? '/'+limit : ''}`)
  },
  addDocument (params) {
    return api().post('documents', params)
  },
  updateDocument (params) {
    return api().put(`documents/${params.id}`, params)
  },
  deleteDocument (id) {
    return api().delete(`documents/${id}`)
  }
}