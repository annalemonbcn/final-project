import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'list/task',
          name: 'details',
          component: () => import('../components/TaskDetailsComp.vue')
        }
      ]
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/AccountView.vue')
    }
  ]
})

export default router
