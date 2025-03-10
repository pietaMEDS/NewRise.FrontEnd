<script setup>
const posts = [
    {
      "id": 38,
      "text": "Вот так вот я докатился до состояния оладушка",
      "status": "0",
      "creator": {
        "id": 6,
        "email": "123@gmail.com",
        "login": "123",
        "role": {
          "id": 2,
          "name": "Admin",
          "desc": "admin",
          "priority": 21
        },
        "rank": {
          "id": 1,
          "name": "test",
          "desc": "test",
          "priority": 0
        },
        "name": "_GEEK_",
        "progress": {
          "current_xp": 3,
          "max_xp": 15
        },
        "avatar": {
          "path": "https://avatars.mds.yandex.net/i?id=2b5001fcded52bec3b647f8f9aec80ba_l-5723597-images-thumbs&n=13"
        },
        "achievements": []
      },
      "forum": {
        "id": 7,
        "name": "Основные каналы",
        "desc": "Основные каналы",
        "postsCount": 3,
        "creator": {
          "id": 6,
          "email": "123@gmail.com",
          "login": "123",
          "role": {
            "id": 2,
            "name": "Admin",
            "desc": "admin",
            "priority": 21
          },
          "rank": {
            "id": 1,
            "name": "test",
            "desc": "test",
            "priority": 0
          },
          "name": "_GEEK_",
          "progress": {
            "current_xp": 3,
            "max_xp": 15
          },
          "avatar": {
            "path": "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg"
          },
          "achievements": []
        },
        "theme": {
          "id": 2,
          "name": "Технический форум",
          "desc": "Баги, предложения и идеи",
          "status": null,
          "created_at": "2024-11-29T23:26:23.000000Z",
          "updated_at": "2024-11-29T23:26:23.000000Z",
          "postsCount": 3
        }
      },
      "reaction": null,
      "created_at": "2024-12-28T21:14:16.000000Z",
      "updated_at": "2024-12-28T21:14:16.000000Z"
    },
    {
      "id": 46,
      "text": "Чего?",
      "status": "0",
      "creator": {
        "id": 6,
        "email": "123@gmail.com",
        "login": "123",
        "role": {
          "id": 2,
          "name": "Admin",
          "desc": "admin",
          "priority": 21
        },
        "rank": {
          "id": 1,
          "name": "test",
          "desc": "test",
          "priority": 0
        },
        "name": "EternityMan",
        "progress": {
          "current_xp": 3,
          "max_xp": 15
        },
        "avatar": {
          "path": "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg"
        },
        "achievements": []
      },
      "forum": {
        "id": 7,
        "name": "Основные каналы",
        "desc": "Основные каналы",
        "postsCount": 3,
        "creator": {
          "id": 6,
          "email": "123@gmail.com",
          "login": "123",
          "role": {
            "id": 2,
            "name": "Admin",
            "desc": "admin",
            "priority": 21
          },
          "rank": {
            "id": 1,
            "name": "test",
            "desc": "test",
            "priority": 0
          },
          "name": "EternityMan",
          "progress": {
            "current_xp": 3,
            "max_xp": 15
          },
          "avatar": {
            "path": "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg"
          },
          "achievements": []
        },
        "theme": {
          "id": 2,
          "name": "Технический форум",
          "desc": "Баги, предложения и идеи",
          "status": null,
          "created_at": "2024-11-29T23:26:23.000000Z",
          "updated_at": "2024-11-29T23:26:23.000000Z",
          "postsCount": 3
        }
      },
      "reaction": null,
      "created_at": "2025-01-12T22:20:34.000000Z",
      "updated_at": "2025-01-12T22:23:55.000000Z"
    },
    {
      "id": 51,
      "text": "Бред несёшь",
      "status": "0",
      "creator": {
        "id": 6,
        "email": "123@gmail.com",
        "login": "123",
        "role": {
          "id": 2,
          "name": "Admin",
          "desc": "admin",
          "priority": 21
        },
        "rank": {
          "id": 1,
          "name": "test",
          "desc": "test",
          "priority": 0
        },
        "name": "EternityMan",
        "progress": {
          "current_xp": 3,
          "max_xp": 15
        },
        "avatar": {
          "path": "https://i.pinimg.com/736x/65/77/ce/6577ce412068daf4874fa8500e4fbcdb.jpg"
        },
        "achievements": []
      },
      "forum": {
        "id": 7,
        "name": "Основные каналы",
        "desc": "Основные каналы",
        "postsCount": 3,
        "creator": {
          "id": 6,
          "email": "123@gmail.com",
          "login": "123",
          "role": {
            "id": 2,
            "name": "Admin",
            "desc": "admin",
            "priority": 21
          },
          "rank": {
            "id": 1,
            "name": "test",
            "desc": "test",
            "priority": 0
          },
          "name": "pieta",
          "progress": {
            "current_xp": 3,
            "max_xp": 15
          },
          "avatar": {
            "path": "http://localhost:8000/storage/avatars/UDXimCOoAjds33WYEst8z8LyhEJsz7cD6vGmnCnE.png"
          },
          "achievements": []
        },
        "theme": {
          "id": 2,
          "name": "Технический форум",
          "desc": "Баги, предложения и идеи",
          "status": null,
          "created_at": "2024-11-29T23:26:23.000000Z",
          "updated_at": "2024-11-29T23:26:23.000000Z",
          "postsCount": 3
        }
      },
      "reaction": null,
      "created_at": "2025-01-17T23:39:52.000000Z",
      "updated_at": "2025-01-24T11:31:40.000000Z"
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

const currentUserId = 6
</script>

<template>
  <div class="posts">
    <template v-for="post in posts">
      <div
        v-if="post.status != 'deleted'"
        v-bind:key="post.id"
        @contextmenu="setDoubleContext(post)"
        class="post"
        :id="`postID_` + post.id"
      >
        <div class="post-sidebar">
          <img
            v-if="post.creator.avatar"
            :src="post.creator.avatar.path"
            :alt="post.creator.login"
            class="avatar"
          />
          <img v-else src="@/assets/users/default.png" alt="default" class="avatar" />
          <div class="author-name">{{ post.creator.name }}</div>
        </div>
        <div class="post-main">
          <div class="post-header">
            <span class="date">{{ formatDate(post.created_at) }}</span>
            <span v-if="post.created_at !== post.updated_at" class="post-updated"
            >Изменено ({{ formatDate(post.updated_at) }})</span
            >
            <div class="post-actions">
              <button class="action-btn reply" @click="replyToPost(post)">Ответить</button>
              <button
                v-if="post.creator.id === currentUserId || userVerified.value"
                class="action-btn edit"
                @click="editPost(post)"
              >
                Изменить
              </button>
              <button
                v-if="post.creator.id === currentUserId || userVerified.value"
                class="action-btn delete"
                @click="deletePost(post.id)"
              >
                Удалить
              </button>
            </div>
          </div>
          <div v-if="post.reaction" class="reaction-preview">
            <a
              v-if="post.reaction.status == 'deleted'"
              :href="`#postID_` + post.reaction.id"
              class="reaction-content"
            >
                  <span class="reaction-author">@{{ post.reaction.creator.name }}</span
                  >:
              <span class="reaction-text">Сообщение было удалено.</span>
            </a>
            <a v-else :href="`#postID_` + post.reaction.id" class="reaction-content">
                  <span class="reaction-author">@{{ post.reaction.creator.name }}</span
                  >:
              <span class="reaction-text">{{
                  post.reaction.text.length > 20
                    ? post.reaction.text.slice(0, 20) + '...'
                    : post.reaction.text
                }}</span>
            </a>
          </div>
          <div
            class="post-content"
            v-for="(postText, postTextIndex) in post.text.split(`\n`)"
            :key="postTextIndex"
          >
            <p>{{ postText }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
.forum-posts {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post {
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-sidebar {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px 0 0 8px;
  width: 150px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.author-name {
  font-weight: 500;
  color: #2c3e50;
  word-break: break-word;
}

.post-main {
  flex: 1;
  padding: 20px;
  min-width: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.2s;
}

.action-btn.edit {
  background: #e9ecef;
  color: #495057;
}

.action-btn.delete {
  background: #fff0f0;
  color: #dc3545;
}

.action-btn:hover {
  opacity: 0.8;
}

.post-content {
  text-align: start;
  line-height: 1.6;
  color: #333;
  word-wrap: break-word;
}

.new-post {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.post-updated {
  color: #666;
  font-weight: normal;
  font-size: 0.8em;
}

.replyimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.reaction-author {
  font-weight: bold;
  color: #0b4988;
  margin-right: 5px;
  font-size: 0.9em;
}

.reaction-content {
  color: #333;
  text-decoration: none;
  border: #033c799d dashed;
  border-radius: 15px;
}
</style>
