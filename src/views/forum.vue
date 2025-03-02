<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDevStore } from '@/stores/dev'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const forumCategories = ref([])
const isLoading = ref(true)
const error = ref(null)
const refreshInterval = ref(null)
const showCreateModal = ref(false)
const isAdmin = ref(false)
const newCategory = ref({
  name: '',
  description: '',
  theme_id: route.params.id,
  isPrivate: false,
})

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
      isAdmin.value = true
    }
  } catch (error) {
    console.error('Ошибка при проверке администратора:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch(`${useDevStore().host}/forums/${route.params.id}`, {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    forumCategories.value = data.data
    error.value = null
  } catch (err) {
    console.error('Произошла ошибка при загрузке данных:', err)
    error.value = err.message
    forumCategories.value = [
      {
        id: null,
        name: 'Данные не загружены',
        desc: 'Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.',
        topicsCount: '-',
        postsCount: '-',
        creator: {
          name: '-',
        },
      },
    ]
  } finally {
    isLoading.value = false
  }
}

const createNewCategory = async () => {
  try {
    const response = await fetch(useDevStore().host + '/forums/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify(newCategory.value),
    })

    if (!response.ok) {
      throw new Error('Ошибка при создании темы')
    }

    await fetchCategories()
    showCreateModal.value = false
    newCategory.value = {
      name: '',
      desc: '',
    }
  } catch (err) {
    console.error('Ошибка создания темы:', err)
    error.value = err.message
  }
}

onMounted(async () => {
  await fetchCategories()
  await CheckPrivate(route.params.id)
  adminCheck()
  refreshInterval.value = setInterval(fetchCategories, 30000)
})

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})

const privateForum = ref(false)

const CheckPrivate = async (id) => {
  const response = await fetch(`${useDevStore().host}/themes/${id}`)
  const data = await response.json()
  if (data.data.status == 'private') {
    privateForum.value = false
  } else {
    privateForum.value = true
  }
}
</script>

<template>
  <div class="container">
    <div class="header-section mb-4 d-flex justify-content-between align-items-center">
      <h1>Форум New Rise</h1>
      <button
        v-if="privateForum || isAdmin"
        class="btn btn-primary"
        @click="showCreateModal = true"
      >
        <i class="fas fa-plus">Создать тему</i>
      </button>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="forum-categories">
      <div v-for="category in forumCategories" :key="category.id" class="card mb-3">
        <router-link :to="{ name: 'forumchat', params: { id: category.id } }">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="card-title">
                  {{ category.name }}
                  <span v-if="category.status != null" class="badge bg-warning ms-2">
                    <i class="fas fa-lock"></i> category.status
                  </span>
                </h5>
                <p class="card-text text-muted">{{ category.desc }}</p>
                <div class="creator-info">
                  <p class="card-text text-muted small">
                    <i class="fas fa-user"></i> Создал: {{ category.creator.name }}
                  </p>
                </div>
              </div>
              <div class="text-end text-muted">
                <div><i class="fas fa-comments"></i> Сообщения: {{ category.postsCount }}</div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Modal for creating new category -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Создать новую тему</h3>
        <form @submit.prevent="createNewCategory">
          <div class="form-group mb-3">
            <label>Название</label>
            <input v-model="newCategory.name" type="text" class="form-control" required />
          </div>
          <div class="form-group mb-3">
            <label>Описание</label>
            <textarea
              v-model="newCategory.description"
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="showCreateModal = false">
              Отмена
            </button>
            <button type="submit" class="btn btn-primary">Создать</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumView',
}
</script>

<style scoped>
.forum-categories {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.card:hover {
  transform: translateY(-2px);
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--bs-primary);
}

.card-title {
  color: var(--bs-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.card-text {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--bs-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

a {
  text-decoration: none;
  color: inherit;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert {
  max-width: 1200px;
  margin: 1rem auto;
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
