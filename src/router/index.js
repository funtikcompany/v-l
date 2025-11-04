import { createRouter, createWebHistory } from 'vue-router'
import ListingsView from '../views/ListingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'listings',
      component: ListingsView
    }
  ]
})

export default router

