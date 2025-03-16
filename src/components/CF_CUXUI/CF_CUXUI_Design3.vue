<script setup>
import { computed, ref } from 'vue'

const posts = [
  {
    id: 38,
    text: 'Вот так вот я докатился до состояния оладушка',
    status: '0',
    creator: {
      id: 6,
      email: '123@gmail.com',
      login: '123',
      role: {
        id: 2,
        name: 'Admin',
        desc: 'admin',
        priority: 21,
      },
      rank: {
        id: 1,
        name: 'test',
        desc: 'test',
        priority: 0,
      },
      name: '_GEEK_',
      progress: {
        current_xp: 3,
        max_xp: 15,
      },
      avatar: {
        path: 'https://avatars.mds.yandex.net/i?id=2b5001fcded52bec3b647f8f9aec80ba_l-5723597-images-thumbs&n=13',
      },
      achievements: [],
    },
    forum: {
      id: 7,
      name: 'Основные каналы',
      desc: 'Основные каналы',
      postsCount: 3,
      creator: {
        id: 6,
        email: '123@gmail.com',
        login: '123',
        role: {
          id: 2,
          name: 'Admin',
          desc: 'admin',
          priority: 21,
        },
        rank: {
          id: 1,
          name: 'test',
          desc: 'test',
          priority: 0,
        },
        name: '_GEEK_',
        progress: {
          current_xp: 3,
          max_xp: 15,
        },
        avatar: {
          path: 'https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg',
        },
        achievements: [],
      },
      theme: {
        id: 2,
        name: 'Технический форум',
        desc: 'Баги, предложения и идеи',
        status: null,
        created_at: '2024-11-29T23:26:23.000000Z',
        updated_at: '2024-11-29T23:26:23.000000Z',
        postsCount: 3,
      },
    },
    reaction: null,
    created_at: '2024-12-28T21:14:16.000000Z',
    updated_at: '2024-12-28T21:14:16.000000Z',
  },
  {
    id: 46,
    text: 'Чего?',
    status: '0',
    creator: {
      id: 6,
      email: '123@gmail.com',
      login: '123',
      role: {
        id: 2,
        name: 'Admin',
        desc: 'admin',
        priority: 21,
      },
      rank: {
        id: 1,
        name: 'test',
        desc: 'test',
        priority: 0,
      },
      name: 'EternityMan',
      progress: {
        current_xp: 3,
        max_xp: 15,
      },
      avatar: {
        path: 'https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg',
      },
      achievements: [],
    },
    forum: {
      id: 7,
      name: 'Основные каналы',
      desc: 'Основные каналы',
      postsCount: 3,
      creator: {
        id: 6,
        email: '123@gmail.com',
        login: '123',
        role: {
          id: 2,
          name: 'Admin',
          desc: 'admin',
          priority: 21,
        },
        rank: {
          id: 1,
          name: 'test',
          desc: 'test',
          priority: 0,
        },
        name: 'EternityMan',
        progress: {
          current_xp: 3,
          max_xp: 15,
        },
        avatar: {
          path: 'https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg',
        },
        achievements: [],
      },
      theme: {
        id: 2,
        name: 'Технический форум',
        desc: 'Баги, предложения и идеи',
        status: null,
        created_at: '2024-11-29T23:26:23.000000Z',
        updated_at: '2024-11-29T23:26:23.000000Z',
        postsCount: 3,
      },
    },
    reaction: null,
    created_at: '2025-01-12T22:20:34.000000Z',
    updated_at: '2025-01-12T22:23:55.000000Z',
  },
  {
    id: 51,
    text: 'Бред несёшь',
    status: '0',
    creator: {
      id: 6,
      email: '123@gmail.com',
      login: '123',
      role: {
        id: 2,
        name: 'Admin',
        desc: 'admin',
        priority: 21,
      },
      rank: {
        id: 1,
        name: 'test',
        desc: 'test',
        priority: 0,
      },
      name: 'EternityMan',
      progress: {
        current_xp: 3,
        max_xp: 15,
      },
      avatar: {
        path: 'https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg',
      },
      achievements: [],
    },
    forum: {
      id: 7,
      name: 'Основные каналы',
      desc: 'Основные каналы',
      postsCount: 3,
      creator: {
        id: 6,
        email: '123@gmail.com',
        login: '123',
        role: {
          id: 2,
          name: 'Admin',
          desc: 'admin',
          priority: 21,
        },
        rank: {
          id: 1,
          name: 'test',
          desc: 'test',
          priority: 0,
        },
        name: 'pieta',
        progress: {
          current_xp: 3,
          max_xp: 15,
        },
        avatar: {
          path: 'http://localhost:8000/storage/avatars/UDXimCOoAjds33WYEst8z8LyhEJsz7cD6vGmnCnE.png',
        },
        achievements: [],
      },
      theme: {
        id: 2,
        name: 'Технический форум',
        desc: 'Баги, предложения и идеи',
        status: null,
        created_at: '2024-11-29T23:26:23.000000Z',
        updated_at: '2024-11-29T23:26:23.000000Z',
        postsCount: 3,
      },
    },
    reaction: null,
    created_at: '2025-01-17T23:39:52.000000Z',
    updated_at: '2025-01-24T11:31:40.000000Z',
  },
]

const currentUserId = 6
const formatDate = (date) =>
  new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
</script>

<template>
  <div class="chat-container">
    <div
      v-for="post in posts"
      :key="post.id"
      :class="['chat-message', { self: post.creator.id === currentUserId }]"
    >
      <div class="avatar">
        <img :src="post.creator.avatar.path" :alt="post.creator.name" />
      </div>
      <div class="message-content">
        <div class="author">{{ post.creator.name }}</div>
        <p class="text">{{ post.text }}</p>
        <div class="meta">
          <span class="date">{{ formatDate(post.created_at) }}</span>
          <span v-if="post.created_at !== post.updated_at" class="edited">(изменено)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.chat-message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  max-width: 80%;
  transition: opacity 0.3s ease-in-out;
}

.self {
  flex-direction: row-reverse;
  background: #007bff;
  color: white;
  align-self: flex-end;
}

.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.author {
  font-weight: bold;
}

.text {
  word-wrap: break-word;
}

.meta {
  font-size: 0.8em;
  color: gray;
}

.edited {
  font-style: italic;
}
</style>
