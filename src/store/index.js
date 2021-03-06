import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import profile from './profile'
import whiteboards from './whiteboards'
import { auth } from './auth/auth.js'


Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    profile,
    auth,
    whiteboards
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})

export default Store
