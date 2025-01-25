import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Register service worker and handle push notifications
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      })
      console.log('Service Worker registration successful with scope:', registration.scope)

      // Request notification permission
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        console.log('Notification permission granted')

        // You can subscribe to push notifications here
        // const subscription = await registration.pushManager.subscribe({
        //   userVisibleOnly: true,
        //   applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
        // });
        // console.log('Push notification subscription:', subscription);
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  })
}
