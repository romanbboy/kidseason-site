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
    getScenario: state => (section, urlName) => {
      let isSection = state.scenario.find(el => el.section === section);
      if(!isSection) return router.push('/');

      return isSection.listScenario.find(el => el.urlName === urlName) || router.push('/');
    }
  }
}