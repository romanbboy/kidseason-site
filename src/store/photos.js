export default {
  state: {
    photos: []
  },
  mutations: {
    SET_PHOTOS(state, payload) {
      state.photos = payload
    }
  },
  actions: {
    setPhotos(context, payload) {
      context.commit('SET_PHOTOS', payload);
    }
  },
  getters: {
    allPhotos: state => {
      return state.photos;
    },
    photosCategory: state => section => {
      return state.photos.filter(el => el.section === section)
    }
  }
}