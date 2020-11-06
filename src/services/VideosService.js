import api from './api';

export default {
  fetchVideos() {
    return api().get('videos')
  },
  addVideo(params) {
    return api().post('videos', params)
  },
  updateVideo (params) {
    return api().put(`videos/${params.id}`, params)
  },
  deleteVideo (id) {
    return api().delete(`videos/${id}`)
  }
}