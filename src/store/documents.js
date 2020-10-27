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
    documents(state) {
      return state.documents
    },
    listDocuments: state => section => {
      if(!state.documents.length || !section) return [];

      let isSection = state.documents.find(el => el.section === section);
      if(!isSection) return router.push('/');

      return state.documents.filter(document => document.section === section)[0]['listDocuments']
    }
  }
}