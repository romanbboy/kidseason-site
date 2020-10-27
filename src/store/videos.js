import router from '../router'

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
    videos(state) {
      return state.videos
    },
    listVideos: state => section => {
      if(!state.videos.length || !section) return [];

      let isSection = state.videos.find(el => el.section === section);
      if(!isSection) return router.push('/');

      return state.videos.filter(video => video.section === section)[0]['listVideo']
    }
  }
}