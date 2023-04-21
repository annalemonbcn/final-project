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
          name: "task details",
          component: () => import('../views/TaskDetailsView.vue'),
        },
        {
          path: "task/add-task",
          name: "add task",
          component: () => import('../views/TaskDetailsView.vue'),
        },
        // {
        //   path: "task/flags",
        //   name: "flagged tasks",
        //   component: () => import('../views/TaskDetailsView.vue'),
        // },
        // {
        //   path: "task/favourites",
        //   name: "favourites tasks",
        //   component: () => import('../views/TaskDetailsView.vue'),
        // }
      ],
    },
    {
      path: "/task/flag",
      name: "flagged tasks",
      component: () => import('../views/TaskDetailsView.vue'),
    },
    {
      path: "/task/favourites",
      name: "favourites tasks",
      component: () => import('../views/TaskDetailsView.vue'),
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/AccountView.vue')
    }
  ]
})

export default router