import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: "task/:taskTitle",
          name: "task",
          component: () => import('../components/TaskDetails/TaskDetails.vue'),
        },
      ],
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/AccountView.vue')
    }
  ]
})

export default router