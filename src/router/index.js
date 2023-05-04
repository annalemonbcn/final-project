import { createRouter, createWebHistory } from 'vue-router'
import UserStore from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('@/views/SignIn.vue')
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: () => import('@/views/SignUp.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/ForgotPasswordView.vue')
        },
      ]
    },
    {
      path: '/recovery-password',
      name: 'recovery-password',
      component: () => import('@/views/RecoveryPasswordView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {requiresAuth: true },
      children: [
        {
          path: "task/:taskUrl",
          name: "task details",
          component: () => import('@/views/TaskDetailsView.vue'),
        },
        {
          path: "task/add-task",
          name: "add task",
          component: () => import('@/views/AddTaskView.vue'),
        },
      ],
    },
  ]
})

router.beforeEach(async (to) => {
  const store = UserStore();

  // If user undefined, fetchUser
  if (store.user === undefined) {
    await store.fetchUser();
  }

  // console.log(store.user)
  
  // If user NULL && try to access to a page that requires auth --> redirect to sign-in
  if (to.meta.requiresAuth && store.user === null) {
    return { name: 'sign-in' }
  }
  // If user !NULL && try to access to signin or signup --> redirect to home
  if ((to.name === 'sign-in' || to.name === 'sign-up') && store.user !== null) {
    return { name: 'home' }
  }
})

export default router