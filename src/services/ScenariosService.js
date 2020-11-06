import api from './api';

export default {
  fetchScenarios() {
    return api().get('scenarios')
  },
  addScenario(params) {
    return api().post('scenarios', params)
  },
  updateScenario (params) {
    return api().put(`scenarios/${params.id}`, params)
  },
  deleteScenario (id) {
    return api().delete(`scenarios/${id}`)
  }
}