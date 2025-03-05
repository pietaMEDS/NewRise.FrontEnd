<script>

import { useAuthStore } from '@/stores/auth.js'
import { ref } from 'vue'
import { useDevStore } from '@/stores/dev.js'

const loaded = ref(false)
const authStore = useAuthStore()
const user = ref(null)

if(authStore.isAuthenticated()){
  const response = await fetch(`${useDevStore().host}/users/${authStore.user_id}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  let data = await response.json()
  user.value = data.data
}

</script>

<template>
  <div>
    <div class="card">
      <h5 class="card-header">Оставить запрос</h5>
      <div class="card-body">
        <h5 class="card-title">{{ user.value ? `Вы оставите запрос от имени ${user.name}` : "Вы оставите запрос анонимно"}}</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <input type="text">
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>
