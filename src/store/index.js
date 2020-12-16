import Vue from 'vue'
import Vuex from 'vuex'

import categories from './categories'
import aside from './aside'
import videos from './videos'
import documents from './documents'
import scenario from './scenarios'
import photo from './photos'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    categories, aside, videos, documents, scenario, photo
  }
})
