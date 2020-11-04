import api from './api'

export default {
  fetchCategories () {
    return api().get('categories')
  },
  addCategory (params) {
    return api().post('categories', params)
  }
}