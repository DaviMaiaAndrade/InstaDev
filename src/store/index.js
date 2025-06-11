import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import posts from './posts'
import user from './user'
import upload from './upload'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      posts,
      user,
      upload,
    },

    strict: process.env.DEBUGGING,
  })

  return Store
}
