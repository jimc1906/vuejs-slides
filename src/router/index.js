import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SongList from '../views/SongList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/slides/:songindexes?',
    name: 'home',
    component: Home
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: SongList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
