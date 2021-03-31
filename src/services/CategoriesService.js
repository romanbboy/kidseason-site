import api from './api'

export default {
  fetchCategories () {
    return api().get('api/categories')
  },
  addCategory (params) {
    return api().post('api/categories', params)
  },
  removeCategory (id) {
    return api().delete(`api/categories/${id}`)
  },
}