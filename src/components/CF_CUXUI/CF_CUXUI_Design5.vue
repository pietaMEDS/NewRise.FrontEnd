<template>
  <div class="chat-container">
    <div v-for="post in posts" :key="post.id" class="message">
      <!-- Левая панель -->
      <div class="user-info">
        <img class="avatar" :src="post.creator.avatar.path" alt="avatar" />
        <div class="username">{{ post.creator.name }}</div>
        <div class="rank">{{ post.creator.rank.name }}</div>
        <div class="role">{{ getRole(post) }}</div>
      </div>

      <!-- Правая панель -->
      <div class="message-content">
        <div class="message-header">
          <span class="date">{{ formatDate(post.created_at) }}</span>
        </div>
        <div class="message-text">{{ post.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const getRole = (post) => post.creator.role.name || 'Неизвестная роль'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 20px auto;
  background: #1e1e1e;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
}

.message {
  display: flex;
  padding: 15px;
  background: #2b2b2b;
  border-radius: 8px;
  margin-bottom: 15px;
}

.user-info {
  width: 180px;
  text-align: center;
  padding-right: 15px;
  border-right: 2px solid #444;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #666;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.rank {
  font-size: 14px;
  color: #aaa;
  margin: 2px 0;
}

.role {
  font-size: 12px;
  background: #2f855a;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
}

.message-content {
  flex: 1;
  padding-left: 15px;
}

.message-header {
  font-size: 14px;
  color: #bbb;
  margin-bottom: 5px;
}

.message-text {
  font-size: 16px;
  background: #333;
  padding: 10px;
  border-radius: 6px;
}
</style>
