import Vue from "vue";
import VueRouter from "vue-router"
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=> import('@/views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('@/views/home.vue'),
      meta: {
        auth: true
      },
      children: [
        {
          path: '/index',
          name: 'home.index',
          component: ()=> import('@/views/index.vue'),
        },
        {
          path: '/Stable',
          name: 'Stable',
          component: ()=> import('@/views/searchTable.vue')
        },
        {
          path: '/ediTable',
          name: 'ediTable',
          component: ()=> import('@/views/ediTable.vue')
        }
      ]
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if(window.sessionStorage.data) {
    if(to.path === '/') {
    // 登录状态下，访问 login.vue页面，会自动跳转到home.vue
      next({path: '/home'})
    }else {
      next()
    }
  }else {
    if(to.path === '/') {
      //如果没有session, 访问任何页面，都会进入登录页面
      next()
    }else {
      next({path: '/'})
    }
  }
})

export default router
