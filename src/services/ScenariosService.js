import api from './api';

export default {
  fetchScenarios(limit) {
    return api().get(`scenarios${limit ? '/'+limit : ''}`)
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