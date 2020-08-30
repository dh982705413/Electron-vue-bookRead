import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: () => import('@/view/Search.vue')
    },
    {
      path: '/detail/:book',
      name: 'detail',
      props: true,
      component: () => import('@/view/Detail.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/view/Book.vue')
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      component: () => import('@/view/BookDetail.vue')
    }
  ]
})
