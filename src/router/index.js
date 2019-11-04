import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SongList from '../views/SongList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: SongList
  },
  {
    path: '/slides/:songindexes?',
    name: 'home',
    component: Home
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: SongList
  }
]

const router = new VueRouter({
  routes
})

export default router
