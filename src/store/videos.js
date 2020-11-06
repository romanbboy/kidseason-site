export default {
  state: {
    videos: []
  },
  mutations: {
    SET_VIDEOS(state, payload) {
      state.videos = payload
    }
  },
  actions: {
    setVideos(context, payload) {
      context.commit('SET_VIDEOS', payload);
    }
  },
  getters: {
    allVideos: state => {
      return state.videos;
    },
    videosCategory: state => section => {
      return state.videos.filter(el => el.section === section)
    }
  }
}