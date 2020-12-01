import api from './api'

export default {
  fetchDocuments (limit) {
    return api().get(`api/documents${limit ? '/'+limit : ''}`)
  },
  addDocument (params) {
    return api().post('api/documents', params)
  },
  updateDocument (params) {
    return api().put(`api/documents/${params.id}`, params)
  },
  deleteDocument (id) {
    return api().delete(`api/documents/${id}`)
  }
}