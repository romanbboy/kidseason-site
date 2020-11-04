import api from './api';

export default {
  fetchScenario() {
    return api().get('scenarios')
  },

  addScenario(params) {
    return api().post('scenarios', params)
  }
}