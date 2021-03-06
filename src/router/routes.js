
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/PageHome.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: '/camera', 
        name: 'camera',
        component: () => import('pages/PageCamera.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/Profile.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/auth',
        name: 'auth',
        component: () => import('pages/Authentication.vue'),
        props: (route) => ({ ...route.params, ...route.query }) // converts query strings and params to props
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/PageAppSettings.vue'),
        props: (route) => ({ ...route.params, ...route.query }) // converts query strings and params to props
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  }
]

export default routes
