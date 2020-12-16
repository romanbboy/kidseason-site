import api from './api'

export default {
  fetchPhotos (limit) {
    return api().get(`api/photos${limit ? '/'+limit : ''}`)
  },
  addPhoto (params) {
    return api().post('api/photos', params)
  },
  deletePhoto (id) {
    return api().delete(`api/photos/${id}`)
  }
}