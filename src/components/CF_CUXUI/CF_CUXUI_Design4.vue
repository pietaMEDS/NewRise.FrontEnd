<template>
  <div class="chat-container">
    <div
      v-for="post in posts"
      :key="post.id"
      :class="['message', isAdmin(post) ? 'admin' : 'user']"
    >
      <img class="avatar" :src="post.creator.avatar.path" alt="avatar" />
      <div>
        <div class="text">{{ post.text }}</div>
        <div class="timestamp">{{ post.creator.name }}, {{ formatDate(post.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 38,
    text: 'Вот так вот я докатился до состояния оладушка',
    creator: {
      name: '_GEEK_',
      role: { name: 'Admin' },
      avatar: {
        path: 'https://avatars.mds.yandex.net/i?id=2b5001fcded52bec3b647f8f9aec80ba_l-5723597-images-thumbs&n=13',
      },
    },
    created_at: '2024-12-28T21:14:16.000000Z',
  },
  {
    id: 46,
    text: 'Чего?',
    creator: {
      name: 'EternityMan',
      role: { name: 'User' },
      avatar: { path: 'https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg' },
    },
    created_at: '2025-01-12T22:20:34.000000Z',
  },
  {
    id: 51,
    text: 'Бред несёшь',
    creator: {
      name: 'pieta',
      role: { name: 'User' },
      avatar: {
        path: 'http://localhost:8000/storage/avatars/UDXimCOoAjds33WYEst8z8LyhEJsz7cD6vGmnCnE.png',
      },
    },
    created_at: '2025-01-17T23:39:52.000000Z',
  },
])

const isAdmin = (post) => post.creator.role.name === 'Admin'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 20px auto;
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background: #f8f9fa;
}

.message {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message .text {
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.message.admin .text {
  background: #dcf8c6;
  align-self: flex-start;
}

.message.user .text {
  background: #fff;
  border: 1px solid #ddd;
  align-self: flex-end;
}

.timestamp {
  font-size: 12px;
  color: gray;
  margin-top: 2px;
}
</style>
