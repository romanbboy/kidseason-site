export default {
  state: {
    aside: {
      show: false,
      asideList: []
    }
  },
  mutations: {
    SET_ASIDE(state, payload) {
      state.aside.asideList = payload;
      state.aside.show = true;
    },
    SHOW_ASIDE(state, payload) {
      state.aside.show = payload;
    }
  },
  actions: {
    setAside(context, payload) {
      context.commit('SET_ASIDE', payload);
    },
    showAside(context, payload) {
      context.commit('SHOW_ASIDE', payload);
    }
  },
  getters: {
    aside(state) {
      return state.aside
    }
  }
}