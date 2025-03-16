<script setup>
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

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
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
</template>

<style>
chat-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
}

.message {
  margin-top: 2vh;
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
