import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Aboutpage.vue'),
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
      path: '/profile',
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
  ],
})

export default router
