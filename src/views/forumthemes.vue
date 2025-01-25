<template>
  <div class="forum-themes">
    <h1 class="title">Темы форума</h1>

    <div v-if="!loaded" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else class="themes-container">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        @click="navigateToTheme(theme.id)"
      >
        <div class="theme-header">
          <h2>{{ theme.name }}</h2>
          <span class="theme-date">{{ formatDate(theme.created_at) }}</span>
        </div>
        <p>{{ theme.desc }}</p>
        <div class="theme-stats">
          <span><i class="fas fa-comments"></i> {{ theme.postsCount }} постов</span>
        </div>
      </div>
    </div>

    <div v-if="loaded && themes.length === 0" class="no-themes">
      <p>Пока нет созданных тем</p>
    </div>

    <button v-if="loaded && isAdmin" class="create-theme-btn" @click="showCreateThemeModal">
      <i class="fas fa-plus"></i> Создать тему
    </button>
  </div>
</template>

<script setup>
import { useDevStore } from '@/stores/dev'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loaded = ref(false)
const themes = ref([])
const isAdmin = ref(false) // TODO: Implement admin check from auth store
const refreshInterval = ref(null)

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const navigateToTheme = (themeId) => {
  router.push(`/forum/${themeId}`)
}

const showCreateThemeModal = () => {
  // TODO: Implement theme creation modal
  console.log('Show create theme modal')
}

const fetchThemes = async () => {
  try {
    const response = await fetch(useDevStore().host + '/themes')
    const data = await response.json()
    themes.value = data.data
    loaded.value = true
  } catch (error) {
    console.error('Не удалось загрузить темы:', error)
    themes.value = [
      {
        id: null,
        name: 'Не удалось загрузить темы',
        desc: 'Произошла ошибка при загрузке тем. Пожалуйста, попробуйте позже.',
        postsCount: '-',
        created_at: new Date(),
      },
    ]
    loaded.value = true
  }
}

onMounted(async () => {
  themes.value = [
    {
      id: null,
      name: 'Загрузка...',
      desc: 'Загрузка...',
      postsCount: '-',
      created_at: new Date(),
    },
  ]

  await fetchThemes()
  refreshInterval.value = setInterval(fetchThemes, 30000) // Refresh every 30 seconds
})

onUnmounted(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script>

<style scoped>
.forum-themes {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  min-height: 400px;
}

.title {
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5em;
  text-align: center;
}

.themes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
}

.theme-card {
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.theme-card h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.4em;
}

.theme-date {
  color: #666;
  font-size: 0.9em;
}

.theme-card p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.theme-stats {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9em;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.theme-stats i {
  margin-right: 5px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.create-theme-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 15px 30px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1em;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.create-theme-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.no-themes {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2em;
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
