<template>
  <div v-if="!loaded" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading profile...</p>
  </div>
  <div v-else>
    <div class="profile-container">
      <h1>Профиль</h1>

      <div class="profile-content">
        <div class="profile-header">
          <div class="avatar">
            <img
              v-if="user.avatar"
              :src="user.avatar.path || './src/assets/users/default.png'"
              alt="Profile picture"
            />
            <img v-else :src="'./src/assets/users/default.png'" alt="Profile picture" />
            <h2>{{ user.name }}</h2>
          </div>
          <div class="rank-info">
            <span
              v-if="user.progress"
              style="width: -webkit-fill-available; display: block; text-align: center"
              >{{ user.rank.name }}</span
            >
            <div class="progress" v-if="user.progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width:' + user.progress.current_xp / (user.progress.max_xp * 0.01) + '%'"
                :width="user.progress.current_xp / (user.progress.max_xp * 0.01)"
                :aria-valuenow="user.progress.current_xp"
                aria-valuemin="0"
                :aria-valuemax="user.progress.max_xp"
              ></div>
            </div>
            <div style="text-align: center">
              <span v-if="user.progress"
                >{{ user.progress.current_xp }}/{{ user.progress.max_xp }} ({{
                  user.progress.current_xp / (user.progress.max_xp * 0.01)
                }}%)</span
              >
              <span style="background-color: rgb(0 0 0 / 37%); padding: 2px" v-else>
                Не имеет ранга
              </span>
            </div>
          </div>
        </div>

        <div class="profile-details">
          <button @click="showModal = true" v-if="user.id == authStore.user_id" class="update-btn">
            Edit Profile
          </button>
          <router-link v-if="userVerified" to="/admin"
            ><button class="update-btn">Админ панель</button></router-link
          >
        </div>

        <div v-if="showModal" class="modal-overlay">
          <div class="modal-message">
            <h2>Обновить профиль</h2>
            <form @submit.prevent="updateProfile">
              <div v-if="formErr" class="error">{{ formErrMessage }}</div>
              <div class="form-group">
                <label for="name">Имя</label>
                <input type="text" id="name" v-model="user.name" required />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="user.email" required />
              </div>

              <div class="form-group">
                <label for="avatar">URL изображения профиля</label>
                <input
                  v-if="user.avatar"
                  type="text"
                  id="avatar"
                  v-model="user.avatar.path"
                  placeholder="Введите URL изображения"
                />
                <input v-else type="text" id="avatar" placeholder="Введите URL изображения" />
              </div>

              <div class="form-group">
                <label for="avatarUpload">Загрузить изображение профиля</label>
                <input type="file" id="avatarUpload" @change="onFileChange" accept="image/*" />
              </div>
              <div class="form-group">
                <label>Текущее изображение профиля:</label>
                <div class="current-avatar" @click="showModal = true">
                  <div v-if="imageUpdated" class="error">{{ imageUpdatedMessage }}</div>
                  <img
                    :src="user.avatar?.path || './src/assets/users/default.png'"
                    alt="Текущее изображение профиля"
                    class="current-avatar-img"
                  />
                </div>
              </div>
              <div class="modal-buttons">
                <button type="submit" class="update-btn">Обновить профиль</button>
                <button type="button" @click="showModal = false" class="cancel-btn">
                  Отменить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router' // Import useRoute
import { useDevStore } from '@/stores/dev'
import router from '@/router'

const route = useRoute() // Initialize route
const authStore = useAuthStore()
const loaded = ref(false)
const showModal = ref(false)
const userVerified = ref(false)
const imageUpdated = ref(false)
const imageUpdatedMessage = ref('err')
const formErr = ref(false)
const formErrMessage = ref('err')
const user_id = ref()
const user = ref({
  name: '',
  email: '',
  bio: '',
  avatar: '',
})

const onFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('file', file) // Append the file to FormData

    try {
      const response = await fetch(useDevStore().host + '/AvatarUpload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      const data = await response.json()
      user.value.avatar.path = await data.path
      imageUpdatedMessage.value = 'Изображение было обновлено!'
      imageUpdated.value = true
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
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

    if (data.status === '200') {
      userVerified.value = true
    }
  } catch (error) {}
}

const updateProfile = async () => {
  try {
    let user_data = user.value

    const response = await fetch(useDevStore().host + '/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ user_data }),
      timeout: 5000,
    })

    if (!response.ok) {
      loaded.value = true
      throw new Error('Failed to update profile')
    }

    const data = await response.json()
    console.log('Profile updated:', data)
  } catch (error) {
    formErr.value = true
    formErrMessage.value = 'Произошла ошибка при обновлении профиля,\nПовторите попытку позже.'
    console.error('Error updating profile:', error)
  } finally {
    imageUpdatedMessage.value = 'err'
    imageUpdated.value = false
    formErr.value = ''
  }
}

onMounted(async () => {
  if (route.params.id) {
    user_id.value = route.params.id
  } else {
    user_id.value = authStore.user_id
  }
  try {
    const response = await fetch(`${useDevStore().host}/users/${user_id.value}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    let data = await response.json()
    user.value = data.data
    loaded.value = true
  } catch (error) {
    console.error('Error fetching user data:', error)
    setTimeout(() => {
      loaded.value = true
      user.value = {
        name: 'Данные не загружены',
        email: 'Данные не загружены',
        bio: 'Данные не загружены',
        avatar: '',
      }
    }, 5000)
  }

  adminCheck()
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-around;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 3vw;
  align-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100px;
  margin-right: 20px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar h2 {
  padding-left: 1vw;
}

.form-group {
  margin-bottom: 20px;
}

.progress {
  min-width: 15vw;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.update-btn {
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-btn:hover {
  background: #45a049;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.cancel-btn {
  background: #666;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background: #555;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
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

.modal-message {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.current-avatar {
  cursor: pointer;
  transition: transform 0.2s;
}

.current-avatar:hover {
  transform: scale(1.05);
}

.current-avatar-img {
  max-width: -webkit-fill-available;
  max-height: 40vh;
}

footer {
  position: absolute !important;
}

.profile-details {
  display: flex;
  justify-content: space-around;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
