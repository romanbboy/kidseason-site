import api from './api';

export default {
  fetchScenarios(limit) {
    return api().get(`api/scenarios${limit ? '/'+limit : ''}`)
  },
  addScenario(params) {
    return api().post('api/scenarios', params)
  },
  updateScenario (params) {
    return api().put(`api/scenarios/${params.id}`, params)
  },
  deleteScenario (id) {
    return api().delete(`api/scenarios/${id}`)
  }
}