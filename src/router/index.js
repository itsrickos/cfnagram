import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store'
import { Auth } from 'aws-amplify';

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  /**
   * Authentication Guard for routes with requiresAuth metadata
   *
   * @param {Object} to - Intended route navigation
   * @param {Object} from - Previous route navigation
   * @param {Object} next - Next route navigation
   * @returns {Object} next - Next route
   */
   Router.beforeEach(async (to, from, next) => {
    const isProtected = to.matched.some((record) => record.meta.requiresAuth)
    const isAuthenticated = await Auth.currentUserInfo();
    // if (isProtected && !isAuthenticated) {
    //   console.info(`Page ${to.fullPath} requires Auth!`)      
    //     try {
    //       await store.dispatch('profile/getSession')
    //     } catch (err) {
    //       next({ name: 'auth', query: { redirectTo: to.name } })
    //     }
    // }
    if (isProtected) {
      console.log('isProtected:', isProtected)
      console.info(`Page ${to.fullPath} requires Auth!`)
      if (!store.getters['profile/isAuthenticated']) {
        try {
          console.log('dispatching profile/getSession:')
          await store.dispatch('profile/getSession')
          next()
        } catch (err) {
          next({ name: 'auth', query: { redirectTo: to.name } })
        }
      }
      else next()
    }
    else next()
  })

  return Router
}