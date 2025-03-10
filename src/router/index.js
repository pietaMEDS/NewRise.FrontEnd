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
      path: '/404',
      name: '404',
      component: () => import('../views/errors/404.vue'),
    },
    {
      path: '/423',
      name: '423',
      component: () => import('../views/errors/423.vue'),
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
      component: () => import('../views/forum-chat.vue'),
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
    {
      path: '/report',
      name: 'report',
      redirect: '/423',
      // component: () => import('../views/ReportPage.vue'),
    },
    {
      path: '/reports/:link',
      name: 'reports',
      redirect: '/423',
      // component: () => import('../views/ReportChat.vue'),
    },
    {
      path: '/CF_CUXUI_results',
      name: 'CF_CUXUI_results',
      // redirect: '/423',
      component: () => import('../views/CF_CUXUI_results.vue'),
    },





    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    }
  ],
})

export default router
