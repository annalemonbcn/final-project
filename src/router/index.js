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
          component: () => import('../views/AddTaskView.vue'),
        },
      ],
    },
    {
      path: "/task/flag",
      name: "flagged-tasks",
      component: () => import('../views/FlagsView.vue'),
    },
    {
      path: "/task/favourites",
      name: "favourites-tasks",
      component: () => import('../views/FavouritesView.vue'),
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    }
  ]
})

export default router