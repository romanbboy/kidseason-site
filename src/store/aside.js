export default {
  state: {
    aside: {
      show: false,
      component: null,
      asideList: []
    }
  },
  mutations: {
    SET_ASIDE(state, payload) {
      state.aside = {
        show: true,
        component: payload.component,
        asideList: payload.aside
      };
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