import router from '../router'

export default {
  state: {
    documents: []
  },
  mutations: {
    SET_DOCUMENTS(state, payload) {
      state.documents = payload
    }
  },
  actions: {
    setDocuments(context, payload) {
      context.commit('SET_DOCUMENTS', payload);
    }
  },
  getters: {
    documents: state => section => {
      return state.documents.filter(el => el.section === section)
    }
  }
}