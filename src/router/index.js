import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/registration.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/profile/:id',
      alias: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue'),
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: () => import('../views/forum.vue'),
    },
    {
      path: '/forum',
      name: 'forumthemes',
      component: () => import('../views/forumthemes.vue'),
    },
    {
      path: '/forum/chat/:id',
      name: 'forumchat',
      component: () => import('../views/forumchat.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPage.vue'),
    },
    {
      path: '/admin/logs/:id',
      name: 'logs',
      component: () => import('../views/LogsPage.vue'),
    },
  ],
})

export default router
