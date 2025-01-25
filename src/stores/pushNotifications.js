import { defineStore } from 'pinia'

export const usePushNotificationStore = defineStore('pushNotifications', {
  state: () => ({
    subscription: null,
    isSubscribed: false,
    registration: null,
  }),

  actions: {
    async initialize() {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push notifications are not supported')
        return
      }

      try {
        // Get service worker registration
        this.registration = await navigator.serviceWorker.ready

        // Check if already subscribed
        const subscription = await this.registration.pushManager.getSubscription()
        this.subscription = subscription
        this.isSubscribed = !!subscription
      } catch (error) {
        console.error('Error initializing push notifications:', error)
      }
    },

    async subscribe() {
      try {
        const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY' // Replace with your public VAPID key

        // Request notification permission
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          throw new Error('Permission not granted for notifications')
        }

        // Subscribe to push notifications
        const subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey),
        })

        this.subscription = subscription
        this.isSubscribed = true

        // Send subscription to your backend
        await this.sendSubscriptionToBackend(subscription)

        return subscription
      } catch (error) {
        console.error('Error subscribing to push notifications:', error)
        throw error
      }
    },

    async unsubscribe() {
      try {
        await this.subscription?.unsubscribe()
        this.subscription = null
        this.isSubscribed = false

        // Notify your backend about unsubscription
        // await this.sendUnsubscriptionToBackend()
      } catch (error) {
        console.error('Error unsubscribing from push notifications:', error)
        throw error
      }
    },

    // Helper function to convert VAPID key
    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
      const rawData = window.atob(base64)
      const outputArray = new Uint8Array(rawData.length)
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    },

    // Send subscription to your backend
    async sendSubscriptionToBackend(subscription) {
      try {
        const response = await fetch('/api/push-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        })
        if (!response.ok) {
          throw new Error('Failed to send subscription to backend')
        }
      } catch (error) {
        console.error('Error sending subscription to backend:', error)
        throw error
      }
    },
  },
})
