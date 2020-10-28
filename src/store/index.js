import Vue from 'vue'
import Vuex from 'vuex'

import videos from './videos'
import aside from './aside'
import documents from './documents'
import scenario from './scenario'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    videos, aside, documents, scenario
  }
})
