import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/components/Edit'
import Home from '@/components/Home'
import List from '@/components/List'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
