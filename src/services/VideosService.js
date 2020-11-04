import api from './api';

export default {
  fetchVideo() {
    return api().get('videos')
  },

  addVideo(params) {
    return api().post('videos', params)
  }
}