import router from '../router'

export default {
  state: {
    scenario: []
  },
  mutations: {
    SET_SCENARIO(state, payload) {
      state.scenario = payload
    }
  },
  actions: {
    setScenario(context, payload) {
      context.commit('SET_SCENARIO', payload);
    }
  },
  getters: {
    scenario(state) {
      return state.scenario
    },
    listScenario: state => section => {
      if(!state.scenario.length || !section) return [];

      let isSection = state.scenario.find(el => el.section === section);
      if (!isSection) return router.push('/');

      return state.scenario.filter(scenario => scenario.section === section)[0]['listScenario']
    },
    getScenario: state => (section, urlName) => {
      let isSection = state.scenario.find(el => el.section === section);
      if(!isSection) return router.push('/');

      return isSection.listScenario.find(el => el.urlName === urlName) || router.push('/');
    }
  }
}