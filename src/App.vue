<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useContextAditionsActionsStore } from './stores/contextFunctions'
import { useNotificationsStore } from '@/stores/pushNotifications.js'
import * as bootstrap from 'bootstrap'
import { useDevStore } from '@/stores/dev.js'
import Pusher from 'pusher-js'
import { ClientJS } from 'clientjs'

const notifications = ref([])
const client = new ClientJS()
const authStore = useAuthStore()
const contextActionsStore = useContextAditionsActionsStore()
const notificationsStore = useNotificationsStore()
const rulesURL = '/forum/chat/7'
const contextmenu = ref(false)
const socket = ref(null)
const channel = ref(null)
let connectNotifySocket = null
const contextMenuFunctional = [
  {
    name: 'Action1',
    action: async function () {
      console.log('action1')
    },
  },
  {
    name: 'Action2',
    action: async function () {
      console.log('action2')
    },
  },
]
const contextMenuPosition = ref({ x: 0, y: 0 })

authStore.getTokenFromSession()

document.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault()
    const rect = document.body.getBoundingClientRect()
    const x = Math.max(rect.left, Math.min(e.clientX, rect.right / 1.1))
    const y = Math.min(e.clientY - rect.top, rect.bottom / 1.5 - rect.top)
    contextMenuPosition.value = { x, y }
    contextmenu.value = true
    console.log('context menu')
  },
  false,
)

const closeContextMenu = () => {
  contextmenu.value = false
  contextActionsStore.clearDoubleAction()
}

onMounted(() => {
  document.addEventListener('click', closeContextMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeContextMenu)
})

console.log(`FingerPrint: ${client.getFingerprint()}`)
console.log(`Custom FingerPrint: ${client.getCustomFingerprint()}`)
console.log(`Browser Data: ${client.getBrowserData().ua}`)
console.log(client.getBrowserData())

if (authStore.isAuthenticated()) {
  connectNotifySocket = () => {
    socket.value = new Pusher('c99fad2f51f6408f6964', {
      cluster: 'eu',
      encrypted: true,
    })

    // Create channel for this forum
    channel.value = socket.value.subscribe(`user-Notifier-${authStore.user_id}`)

    // Bind to new post events
    channel.value.bind('notify', (data) => {
      notificationsStore.addNotification({ type: data.type, message: data.message })
    })

    // Handle connection states
    socket.value.connection.bind('connected', () => {
      console.log(`Notifier connected to user ${authStore.user_id}`)
    })

    socket.value.connection.bind('disconnected', () => {
      console.log(`Notifier disconnected from user ${authStore.user_id}`)
    })

    socket.value.connection.bind('error', (error) => {
      console.error('Pusher connection error:', error)
    })
  }

  connectNotifySocket()
} else if (socket.value) {
  socket.value.unsubscribe('my-channel')
}
</script>

<template>
  <head>
    meta
  </head>
  <div id="wip">WIP | Version: {{ useDevStore().Version }}</div>
  <header>
    <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            width="40"
            height="40"
            class="d-inline-block align-text-top"
          />
          <p>New Rise</p>
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active">Главная</RouterLink>
            </li>
            <li class="nav-item dropdown">
              <RouterLink
                id="forumsdropdownmenu"
                class="nav-link dropdown-toggle"
                to="/forum"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Форум
              </RouterLink>
              <ul class="dropdown-menu" aria-labelledby="forumsdropdownmenu">
                <li>
                  <RouterLink class="dropdown-item" to="/forum">Главная</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/forum/chat/3">Устав</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/forum/chat/5">Предложения</RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" :to="rulesURL">Правила</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex gap-2">
            <template v-if="!authStore.isAuthenticated()">
              <RouterLink to="/registration" class="btn btn-outline-light">Регистрация</RouterLink>
              <RouterLink to="/login" class="btn btn-outline-light">Войти</RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/profile" class="btn btn-outline-light">Профиль</RouterLink>
              <button @click="authStore.clearToken" class="btn btn-outline-light">Выйти</button>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div @contextmenu.prevent="contextmenu = true">
    <RouterView />
  </div>

  <div class="notify-windows">
    <template v-for="(item, index) in notificationsStore.Notifications" :key="index">
      <div v-if="item" :class="'notify-window notify-' + item.type">
        <h3>{{ item.type }}</h3>
        <hr />
        <span>{{ item.message }}</span>
      </div>
    </template>
  </div>

  <div
    v-if="contextmenu"
    class="context-menu"
    tabindex="0"
    :style="{ top: contextMenuPosition.y + 'px', left: contextMenuPosition.x + 'px' }"
  >
    <ul>
      <li
        v-for="(contextAction, contextActionIndex) in contextMenuFunctional"
        :key="contextActionIndex"
        @click="contextAction.action"
      >
        {{ contextAction.name }}
      </li>
      <hr v-if="contextActionsStore.actions" />
      <div v-if="contextActionsStore.actions">
        <li
          v-for="(addAction, addActionIndex) in contextActionsStore.actions"
          :key="addActionIndex"
          @click="addAction.action"
        >
          {{ addAction.name }}
        </li>
      </div>

      <hr v-if="contextActionsStore.DoubleActions" />
      <div v-if="contextActionsStore.DoubleActions">
        <li
          v-for="(addAction, addActionIndex) in contextActionsStore.DoubleActions"
          :key="addActionIndex"
          @click="addAction.action"
        >
          {{ addAction.name }}
        </li>
      </div>
    </ul>
  </div>

  <footer class="footer mt-auto py-4 bg-primary text-light">
    <div class="container">
      <div class="row gy-4">
        <div class="col-md-4">
          <h5>О нас</h5>
          <p>New Rise - ролевой сервер на базе игры Garry's Mod во вселенной Star Wars</p>
        </div>
        <div class="col-md-4">
          <h5>Ссылки</h5>
          <ul class="list-unstyled">
            <li><RouterLink :to="rulesURL" class="text-light">Правила</RouterLink></li>
            <li><RouterLink :to="{ name: 'report' }" class="text-light">Поддержка</RouterLink></li>
            <li><RouterLink :to="{ name: `forumthemes` }" class="text-light">Форум</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Контакты</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-light">Discord</a></li>
          </ul>
        </div>
      </div>
      <hr class="bg-light" />
      <div class="text-center">
        <span>&copy; 2024 New Rise. Все права защищены.</span>
      </div>
    </div>
  </footer>
</template>

<style>
<!--/* Base styles */-->
body {
  padding-bottom: 200px;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

/* Navigation styles */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
}
.navbar-brand p {
  margin: 0;
  padding: 0 0 0 1lvw;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e9ecef !important;
}

/* Footer styles */
.footer {
  top: auto;
  bottom: 0;
  height: 35vh;
  position: absolute;
  width: 100%;
  margin-top: 200px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer h5 {
  margin-bottom: 1rem;
  font-weight: bold;
}

.footer ul li {
  margin-bottom: 0.5rem;
}

.footer a {
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer a:hover {
  opacity: 0.8;
}

/* Context Menu Styles */
.context-menu {
  position: absolute; /* Position it absolutely */
  background-color: white; /* Background color */
  border: 1px solid #ccc; /* Border for the menu */
  border-radius: 4px; /* Rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  z-index: 1000; /* Ensure it appears above other elements */
  padding: 10px; /* Padding inside the menu */
  width: 150px; /* Fixed width for the menu */
}

.context-menu ul {
  list-style: none; /* Remove default list styles */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
}

.context-menu li {
  padding: 8px 12px; /* Padding for each menu item */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.2s; /* Smooth background transition */
}

.context-menu li:hover {
  background-color: #f0f0f0; /* Highlight on hover */
}

.context-menu hr {
  margin: 5px 0; /* Margin for the divider */
  border: 0; /* Remove default border */
  border-top: 1px solid #ccc; /* Custom border for the divider */
}

.notify-windows {
  width: 15vw;
  position: fixed;
  z-index: 9119;
  top: auto;
  right: 2vw;
  left: auto;
  bottom: 4vh;
  text-align: center;
}

.notify-windows div h3 {
  text-align: start;
}

.notify-window {
  margin: 5px 0;
  color: black;
  background: rgb(0 130 247 / 33%);
  border: rgb(0 130 247 / 70%) solid 3px;
  padding: 10px;
  border-radius: 15px;
}

.notify-Error {
  background: rgb(255 62 62 / 33%);
  border: rgb(5 0 0 / 77%) solid 3px;
}
</style>
