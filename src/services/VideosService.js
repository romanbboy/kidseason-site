import api from './api';

export default {
  fetchVideos(limit) {
    return api().get(`api/videos${limit ? '/'+limit : ''}`)
  },
  addVideo(params) {
    return api().post('api/videos', params)
  },
  updateVideo (params) {
    return api().put(`api/videos/${params.id}`, params)
  },
  deleteVideo (id) {
    return api().delete(`api/videos/${id}`)
  }
}