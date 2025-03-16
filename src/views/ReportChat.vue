<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useDevStore } from '@/stores/dev.js'
import Pusher from 'pusher-js'
import { useAuthStore } from '@/stores/auth.js'

const route = useRoute()
const posts = ref([])
const reportData = ref(null)
const messageInput = ref('')
const sending = ref(false)
const error = ref(null)
const chatContainer = ref(null)
const authStore = useAuthStore()

const formatDate = computed(() => (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
})

async function GetPosts() {
  try {
    const response = await fetch(`${useDevStore().host}/report/show/${route.params.link}/`, {
      method: 'GET',
    })
    let data = await response.json()
    posts.value = data.data.messages
    reportData.value = data.data
    scrollToBottom()
  } catch (err) {
    console.error('Ошибка при загрузке сообщений:', err)
  }
}

async function sendMessage() {
  if (!messageInput.value.trim()) return
  sending.value = true
  error.value = null

  try {
    const response = await fetch(`${useDevStore().host}/report/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authStore.token },

      body: JSON.stringify({
        text: messageInput.value.trim(),
        report_id: reportData.value.id,
        user_id: authStore.user_id,
      }),
    })

    if (!response.ok) throw new Error('Ошибка отправки')
    messageInput.value = ''
  } catch (err) {
    error.value = 'Не удалось отправить сообщение'
  } finally {
    sending.value = false
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

onMounted(() => {
  GetPosts()

  // const pusher = new Pusher('YOUR_PUSHER_KEY', { cluster: 'YOUR_CLUSTER' });
  // const channel = pusher.subscribe(`chat-${route.params.link}`);
  // channel.bind('new-message', function (data) {
  //   posts.value.push(data.message);
  //   scrollToBottom();
  // });
})

watch(() => route.params.link, GetPosts)
</script>

<template>
  <div class="chat-container" ref="chatContainer">
    <div
      v-for="post in posts"
      :key="post.id"
      class="message"
      :class="{
        'admin-message': post.creator.role === 'Admin',
        'user-message': post.creator.role !== 'Admin',
      }"
    >
      <div class="message-avatar">
        <img v-if="post.creator.avatar" :src="post.creator.avatar.path" class="avatar" />
        <img v-else src="@/assets/users/default.png" class="avatar" />
      </div>
      <div class="message-content">
        <div class="message-info">
          <span class="author">{{ post.creator.name }}</span>
          <span class="date">{{ formatDate(post.created_at) }}</span>
        </div>
        <p class="message-text">{{ post.text }}</p>
      </div>
    </div>
  </div>

  <div class="new-post">
    <textarea v-model="messageInput" placeholder="Напишите ваше сообщение..."></textarea>
    <div class="post-actions">
      <button @click="sendMessage" :disabled="sending">Отправить</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>

  <div class="chat-input">
    <textarea
      v-model="messageInput"
      placeholder="Введите сообщение..."
      @keyup.enter.exact.prevent="sendMessage"
    ></textarea>
    <button @click="sendMessage" :disabled="sending">Отправить</button>
    <p v-if="sending">Отправка...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
}

.admin-message {
  align-self: flex-start;
  background: #f0f0f0;
}

.user-message {
  align-self: flex-end;
  background: #d1e7ff;
}

.message-avatar .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-content {
  flex: 1;
}

.message-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85em;
  color: #666;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-top: 1px solid #ddd;
}

textarea {
  margin: 10px;
  flex: 1;
  padding: 10px;
  width: -webkit-fill-available;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>
