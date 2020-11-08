import router from '../router'

export default {
  state: {
    scenarios: []
  },
  mutations: {
    SET_SCENARIOS(state, payload) {
      state.scenarios = payload
    }
  },
  actions: {
    setScenarios(context, payload) {
      context.commit('SET_SCENARIOS', payload);
    }
  },
  getters: {
    allScenarios: state => {
      return state.scenarios;
    },
    scenariosCategory: state => section => {
      return state.scenarios.filter(el => el.section === section)
    },
    getScenario: state => sign => {
      return state.scenarios.find(el => el.sign === sign) || router.push('/');
    }
  }
}