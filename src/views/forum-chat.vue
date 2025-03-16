<template>
  <div class="forum-posts">
    <div v-if="!loaded" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else>
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
                    v-if="post.creator.id == currentUserId || userVerified"
                    class="action-btn edit"
                    @click="editPost(post)"
                  >
                    Изменить
                  </button>
                  {{ post.id }}
                  <button
                    v-if="post.creator.id == currentUserId || userVerified"
                    class="action-btn delete"
                    @click="deletePost(post)"
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

      <div class="new-post">
        <div v-if="ReplyPost" class="reply-preview">
          <img
            class="replyimg"
            v-if="ReplyPost.creator.avatar"
            :src="ReplyPost.creator.avatar.path"
            :alt="ReplyPost.creator.login"
          /><img
            v-else
            class="replyimg"
            src="@/assets/users/default.png"
            :alt="ReplyPost.creator.login"
          />{{ ReplyPost.text.length > 20 ? ReplyPost.text.slice(0, 20) + '...' : ReplyPost.text }}
        </div>
        <textarea
          v-model="newPost"
          placeholder="Напишите ваше сообщение..."
          :disabled="!loaded"
        ></textarea>
        <div class="post-actions">
          <button @click="createPost" :disabled="!loaded || !newPost.trim()">Отправить</button>
          <button @click="cancelReply" v-if="ReplyPost">Отменить</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Редактировать пост</h3>
        <textarea v-model="EditPost.text" placeholder="Напишите ваше сообщение..."></textarea>
        <button @click="updatePost">Сохранить</button>
        <button @click="closeModal">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useContextAditionsActionsStore } from '@/stores/contextFunctions'
import Pusher from 'pusher-js'
import { useDevStore } from '@/stores/dev'
import { useNotificationsStore } from '@/stores/pushNotifications.js'

const authStore = useAuthStore()
const route = useRoute()
const loaded = ref(false)
const posts = ref([])
const newPost = ref('')
const currentUserId = authStore.user_id
const showModal = ref(false)
const EditPost = ref('')
const ReplyPost = ref('')
const userVerified = ref(false)
const messageActions = ref()
const contextActionsStore = useContextAditionsActionsStore()
const socket = ref(null)
const channel = ref(null)
const notificationStore = useNotificationsStore()

const connectChatSocket = () => {
  socket.value = new Pusher('c99fad2f51f6408f6964', {
    cluster: 'eu',
    encrypted: true,
  })

  // Create channel for this forum
  channel.value = socket.value.subscribe(`forum-chat-${route.params.id}`)

  // Bind to new post events
  channel.value.bind('new-post', (data) => {
    posts.value.push(data.post)
  })

  // Bind to updated post events
  channel.value.bind('updated-post', (data) => {
    console.log('Updated post received:', data)
    const index = posts.value.findIndex((post) => {
      post.id === data.post.id
    })

    if (index !== -1) {
      posts.value[index] = data.post
    }
  })
  // Bind to post delete events
  channel.value.bind('delete-post', (data) => {
    console.log('Post delete received:', data)
    const index = posts.value.findIndex((post) => post.id === data.post.id)
    if (index !== -1) {
      posts.value[index].text = `{ Сообщение удалено }`
    }
  })

  // Handle connection states
  socket.value.connection.bind('connected', () => {
    console.log('Connected to Pusher')
  })

  socket.value.connection.bind('disconnected', () => {
    console.log('Disconnected from Pusher')
  })

  socket.value.connection.bind('error', (error) => {
    console.error('Pusher connection error:', error)
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const setDoubleContext = (post) => {
  if (post.creator.id === currentUserId || userVerified.value) {
    messageActions.value = [
      {
        name: 'Ответить...',
        action: async function () {
          replyToPost(post)
        },
      },
      {
        name: 'Удалить сообщение',
        action: async function () {
          deletePost(post)
        },
      },
      {
        name: 'Изменить сообщение',
        action: async function () {
          editPost(post)
        },
      },
      {
        name: 'Перейти в профиль',
        action: async function () {
          router.push('/profile/' + post.creator.id)
        },
      },
    ]
  } else {
    messageActions.value = [
      {
        name: 'Ответить...',
        action: async function () {
          replyToPost(post)
        },
      },
      {
        name: 'Перейти в профиль',
        action: async function () {
          router.push('/profile/' + post.creator.id)
        },
      },
    ]
  }

  contextActionsStore.setDoubleAction(messageActions)
}

const adminCheck = async () => {
  try {
    const response = await fetch(useDevStore().host + '/admin/check', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    console.log(data.status)

    if (data.status === '200') {
      userVerified.value = true
    }
  } catch (error) {
    console.error('Ошибка при проверке администратора:', error)
  }
}

const createPost = async () => {
  if (!newPost.value.trim()) return

  try {
    const post = {
      author: {
        id: currentUserId.value,
        name: 'Текущий пользователь',
        avatar: './src/assets/users/default.png',
      },
      message_id: ReplyPost.value.id,
      text: newPost.value,
      forum_id: route.params.id, // Assuming the forum ID is passed as a route parameter
      createdAt: new Date(),
    }

    const response = await fetch(useDevStore().host + '/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`, // Replace yourTokenVariable with the actual token variable
      },
      body: JSON.stringify(post),
    })

    if (!response.ok) {
      throw new Error('Ошибка при отправке поста')
    }
    newPost.value = ''
    ReplyPost.value = ''
  } catch (error) {
    notificationStore.addNotification({
      type: 'Error',
      message: 'При отправки сообщения произошла ошибка',
    })
    console.error('Ошибка при создании поста:', error)
  }
}

const fetchPosts = async () => {
  try {
    if (route.params.id == undefined) {
      clearInterval(intervalId.value)
      return
    }
    const response = await fetch(`${useDevStore().host}/messages/${route.params.id}`)
    const data = await response.json()
    posts.value = data.data
    loaded.value = true
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error)
  }
}

const intervalId = ref(null)

const editPost = (post) => {
  if (post.creator.id == authStore.user_id) {
    EditPost.value = post
    showModal.value = true
  } else {
    console.log(`no access`)
  }
}

const deletePost = async (post) => {
  if (post.creator.id != authStore.user_id && !userVerified.value) {
    console.log(userVerified.value)
    console.log('no access')
    return null
  }
  try {
    const response = await fetch(`${useDevStore().host}/messages/${post.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Ошибка при удалении поста')
    }

    posts.value = posts.value.filter((post) => post.id !== postId)
  } catch (error) {
    console.error('Ошибка при удалении поста:', error)
  }
}

const closeModal = () => {
  showModal.value = false
  EditPost.value = '' // Clear the textarea when closing the modal
}

const updatePost = async () => {
  // if (!newPost.value.trim()) return;

  const response = await fetch(`${useDevStore().host}/messages/${EditPost.value.id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify({ text: EditPost.value.text }),
  })

  if (!response.ok) {
    throw new Error('Ошибка при обновлении поста')
  }

  const updatedPost = await response.json()
  const index = posts.value.findIndex((p) => p.id === updatedPost.id)
  if (index !== -1) {
    posts.value[index] = updatedPost // Update the post in the local state
  }
  closeModal()
}

const replyToPost = (post) => {
  ReplyPost.value = post
  newPost.value.message_id = post.id // Добавляем имя автора поста в новое сообщение
  // Здесь можно добавить логику для отображения текста сообщения над полем ввода
}

const cancelReply = () => {
  ReplyPost.value = '' // Сбрасываем ответ на пост
}

onMounted(async () => {
  setTimeout(() => {
    if (!loaded.value) {
      posts.value = [
        {
          id: 1,
          text: 'Loading...',
          creator: {
            id: 1,
            name: 'System',
          },
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
      loaded.value = true
    }
  }, 20000)
  await fetchPosts()
  connectChatSocket() // Only call connectChatSocket once
  adminCheck()
})

onUnmounted(() => {
  // Clean up Pusher subscription when component is unmounted
  if (channel.value) {
    channel.value.unsubscribe()
  }
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<style scoped>
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
