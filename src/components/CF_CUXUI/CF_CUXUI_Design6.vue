<template>
  <div class="forum">
    <div v-for="post in posts" :key="post.id" class="forum-post">
      <!-- Левая панель (информация о пользователе) -->
      <div class="user-info">
        <img class="avatar" :src="post.creator.avatar.path" alt="avatar" />
        <div class="username">{{ post.creator.name }}</div>
        <div class="rank">{{ post.creator.rank.name }}</div>
        <button class="role">{{ post.creator.role.name }}</button>
      </div>

      <!-- Правая панель (контент поста) -->
      <div class="post-content">
        <div class="post-header">
          <span class="date">{{ formatDate(post.created_at) }}</span>
        </div>
        <div class="post-text">{{ post.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const posts = ref([
  {
    id: 38,
    text: "Вот так вот я докатился до состояния оладушка",
    created_at: "2024-12-28T21:14:16.000000Z",
    creator: {
      name: "_GEEK_",
      rank: { name: "test" },
      role: { name: "Admin" },
      avatar: { path: "https://avatars.mds.yandex.net/i?id=2b5001fcded52bec3b647f8f9aec80ba_l-5723597-images-thumbs&n=13" }
    }
  },
  {
    id: 46,
    text: "Чего?",
    created_at: "2025-01-12T22:20:34.000000Z",
    creator: {
      name: "EternityMan",
      rank: { name: "test" },
      role: { name: "Admin" },
      avatar: { path: "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg" }
    }
  },
  {
    id: 51,
    text: "Бред несёшь",
    created_at: "2025-01-17T23:39:52.000000Z",
    creator: {
      name: "EternityMan",
      rank: { name: "test" },
      role: { name: "Admin" },
      avatar: { path: "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg" }
    }
  }
]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", { day: "2-digit", month: "short", year: "numeric" });
};
</script>

<style scoped>
.forum {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.forum-post {
  display: flex;
  padding: 15px;
  background: #1e1e1e;
  color: #fff;
  border-radius: 8px;
  border: 1px solid #444;
}

.user-info {
  width: 200px;
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
}

.role {
  font-size: 12px;
  background: #2f855a;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  margin-top: 5px;
  cursor: pointer;
}

.post-content {
  flex: 1;
  padding-left: 15px;
}

.post-header {
  font-size: 14px;
  color: #bbb;
  text-align: right;
}

.post-text {
  font-size: 16px;
  background: #333;
  color: white;
  padding: 10px;
  border-radius: 6px;
  margin: 10px 0;
}
</style>
