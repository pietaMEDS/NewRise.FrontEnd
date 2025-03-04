import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('NotificationsFunction', {
  state: () => ({
    Notifications: [],
  }),

  actions: {
    addNotification(data) {
      let newNotificationIndex = this.Notifications.length
      this.Notifications.push(data)
      setTimeout( ()=> {
        this.Notifications[newNotificationIndex] = null
      },10000)
    }
  },
})
