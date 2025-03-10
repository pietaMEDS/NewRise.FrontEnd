<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { onMounted, ref } from 'vue'
import { useDevStore } from '@/stores/dev.js'
import { useRouter } from 'vue-router'

const loaded = ref(false)
const authStore = useAuthStore()
const user = ref(null)
const theme = ref(null)
const text = ref(null)
const router = useRouter()

onMounted(async () => {
  if (authStore.isAuthenticated()) {
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
    loaded.value = true
  } else {
    loaded.value = true
    user.value = false
  }
})

async function SendReport() {
  const request = { theme: theme.value, text: text.value }
  const response = await fetch(`${useDevStore().host}/report/create`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let responseData = await response.json()
  if (responseData.link){
    console.log(`Link: ${responseData.link}`)
    router.push({ path: `reports/${responseData.link}` })
  }

}
</script>

<template>
  <div v-if="!loaded" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading profile...</p>
  </div>
  <div v-else>
    <div class="card">
      <h5 class="card-header">Оставить запрос</h5>
      <div class="card-body">
        <h5 class="card-title">
          {{ user ? `Вы оставите запрос от имени ${user.name}` : 'Вы оставите запрос анонимно' }}
        </h5>
        <p class="card-text">Опишите ситуацию как можно подробней</p>
        <input v-model="theme" type="text" id="theme" />
        <textarea v-model="text" class="card-text" id="text"></textarea>
        <button :onclick="SendReport" class="btn btn-primary">Отправить</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
