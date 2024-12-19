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
            <img :src="user.avatar.path || './src/assets/users/default.png'" alt="Profile picture" />
          </div>
          <div class="user-info">
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </div>
        </div>

        <div class="profile-details">
          <button @click="showModal = true" class="update-btn">Edit Profile</button>
        </div>

        <div v-if="showModal" class="modal-overlay">
          <div class="modal-message">
            <h2>Update Profile</h2>
            <form @submit.prevent="updateProfile">
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
                  type="text"
                  id="avatar"
                  v-model="user.avatar"
                  placeholder="Введите URL изображения"
                />
              </div>
              <div class="form-group">
                <label>Текущее изображение профиля:</label>
                <div class="current-avatar" @click="showModal = true">
                  <img
                    :src="user.avatar || './src/assets/users/default.png'"
                    alt="Текущее изображение профиля"
                    class="current-avatar-img"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="avatarUpload">Загрузить изображение профиля</label>
                <input type="file" id="avatarUpload" @change="onFileChange" accept="image/*" />
              </div>
              <div class="modal-buttons">
                <button type="submit" class="update-btn">Update Profile</button>
                <button type="button" @click="showModal = false" class="cancel-btn">Cancel</button>
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

const authStore = useAuthStore()
const loaded = ref(false)
const showModal = ref(false)
const user = ref({
  name: '',
  email: '',
  bio: '',
  avatar: '',
})

const updateProfile = async () => {
  try {
    let user_data = user.value

    const response = await fetch('http://127.0.0.1:8000/api/users/update', {
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
    console.error('Error updating profile:', error)
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${authStore.user_id}`, {
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
}

.avatar {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.form-group {
  margin-bottom: 20px;
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
</style>
