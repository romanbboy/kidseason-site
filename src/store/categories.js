export default {
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    }
  },
  actions: {
    setCategories(context, payload) {
      context.commit('SET_CATEGORIES', payload);
    }
  },
  getters: {
    categories: state => {
      return state.categories;
    },
    getFullNameCategory: state => section => {
      return state.categories.filter(el => el.name === section)[0]['fullName']
    }
  }
}