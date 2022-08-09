import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/testroute',
    name: 'Routers',
    component: () => import('../views/Routers.vue'),
    meta: {
      title: '测试路由'
    },
    children: [
      {
        path: 'first',
        name: 'MyFirstRoute',
        component: () => import('../components/routePage/MyFirstRoute.vue'),
        meta: {
          title: '第一个路由'
        },
        props($route) {
          return {
            id: 123,
            title: 'children'
          }
        },
        children: [
          {
            path: 'news',
            name: 'News',
            component: () => import('../components/routePage/News.vue'),
            meta: {
              isAuth: true,
              title: '新闻'
            }
          },
          {
            path: 'message',
            name: 'Message',
            component: () => import('../components/routePage/Message.vue'),
            meta: {
              isAuth: true,
              title: '消息'
            }
          }
        ]
      },
    ]
  }
]

const auth = 'wang'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.meta.isAuth) {
    if(auth === 'wang') {
      next()
    }
  }else {
    next()
  }
})

router.afterEach((to, from) =>{
  document.title = to.meta.title || '欢迎学习vue'
})

export default router
