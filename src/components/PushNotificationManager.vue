<template>
  <div class="push-notification-manager">
    <button
      @click="toggleSubscription"
      :class="{ subscribed: isSubscribed }"
      class="notification-button"
    >
      {{ isSubscribed ? 'Отключить уведомления' : 'Включить уведомления' }}
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePushNotificationStore } from '@/stores/pushNotifications'
import { storeToRefs } from 'pinia'

const pushStore = usePushNotificationStore()
const { isSubscribed } = storeToRefs(pushStore)

const toggleSubscription = async () => {
  try {
    if (isSubscribed.value) {
      await pushStore.unsubscribe()
    } else {
      await pushStore.subscribe()
    }
  } catch (error) {
    console.error('Error toggling push notification subscription:', error)
  }
}

onMounted(async () => {
  await pushStore.initialize()
})
</script>

<style scoped>
.push-notification-manager {
  margin: 1rem 0;
}

.notification-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-button:hover {
  background-color: #45a049;
}

.notification-button.subscribed {
  background-color: #f44336;
}

.notification-button.subscribed:hover {
  background-color: #da190b;
}
</style>
