<template>
  <div v-if="userVerified" class="admin-page">
    <h1>Админ Панель</h1>

    <div class="user-management">
      <h2>Управление пользователями</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="viewUser(user.id)">Просмотр</button>
              <button @click="deleteUser(user.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="site-statistics">
      <h2>Статистика сайта</h2>
      <p>Общее количество пользователей: {{ totalUsers }}</p>
      <p>Общее количество постов: {{ totalPosts }}</p>
    </div>

    <!-- User Details Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Детали пользователя</h3>
        <p><strong>ID:</strong> {{ selectedUser.data.id }}</p>

        <p v-if="!EditModal"><strong>Имя:</strong> {{ selectedUser.data.name }}</p>
        <p v-else><strong>Имя:</strong> <input type="text" v-model="selectedUser.data.name" /></p>

        <p v-if="!EditModal"><strong>Логин:</strong> {{ selectedUser.data.login }}</p>
        <p v-else>
          <strong>Логин:</strong> <input type="text" v-model="selectedUser.data.login" />
        </p>

        <p v-if="!EditModal"><strong>Email:</strong> {{ selectedUser.data.email }}</p>
        <p v-else>
          <strong>Email:</strong> <input type="text" v-model="selectedUser.data.email" />
        </p>

        <div class="role-box">
          <p v-if="!EditModal"><strong>Роль:</strong> {{ selectedUser.data.role.name }}</p>
          <select v-model="selectedUser.data.role.id" v-if="EditModal">
            <option
              v-for="role in roles"
              :value="role.id"
              :selected="role.id === selectedUser.data.role.id"
            >
              {{ role.name }}
            </option>
          </select>

          <p v-if="!EditModal"><strong>Описание роли:</strong> {{ selectedUser.data.role.desc }}</p>
          <p v-if="!EditModal"><strong>Приоритет:</strong> {{ selectedUser.data.role.priority }}</p>
        </div>
        <div class="role-box">
          <p><strong>Ранг:</strong> {{ selectedUser.data.rank.name }}</p>
          <p><strong>Описание ранга:</strong> {{ selectedUser.data.rank.desc }}</p>
          <p><strong>Приоритет:</strong> {{ selectedUser.data.rank.priority }}</p>
        </div>
        <div class="user-avatar">
          <img v-if="selectedUser.data.avatar" :src="selectedUser.data.avatar.path" alt="Avatar" />
          <img v-else :src="'./src/assets/users/default.png'" alt="Avatar" />
        </div>

        <div class="modal-actions">
          <button @click="editSelectedUser">Принять изменения</button>
          <button @click="editUser">Редактировать</button>
          <button @click="closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const users = ref([])
const totalUsers = ref(0)
const totalPosts = ref(0)
const userVerified = ref(false)
const router = useRouter()
const showModal = ref(false)
const selectedUser = ref({})
const EditModal = ref(false)
const roles = ref([])

const fetchUsers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    users.value = data.data
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error)
  }
}

const fetchRoles = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/roles', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    roles.value = data.data
  } catch (error) {
    console.error('Ошибка при загрузке ролей:', error)
  }
}

const fetchStatistics = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/statistics', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    totalUsers.value = data.totalUsers
    totalPosts.value = data.totalPosts
  } catch (error) {
    console.error('Ошибка при загрузке статистики:', error)
  }
}

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    if (response.ok) {
      users.value = users.value.filter((user) => user.id !== userId)
    } else {
      throw new Error('Ошибка при удалении пользователя')
    }
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error)
  }
}
const adminCheck = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/admin/check', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    console.log(data.status)

    if (data.status === '200') {
      userVerified.value = true
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Ошибка при проверке администратора:', error)
    router.push('/')
  }
}

const viewUser = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const userData = await response.json()
    selectedUser.value = userData // Set the selected user data
    showModal.value = true // Show the modal
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя:', error)
  }
}

const closeModal = () => {
  showModal.value = false // Hide the modal
}

const editUser = async () => {
  EditModal.value = true
}

const editSelectedUser = async () => {
  let user_data = selectedUser.value
  const response = await fetch(
    `http://127.0.0.1:8000/api/users/update/${selectedUser.value.data.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ user_data }),
      timeout: 5000,
    },
  )

  if (!response.ok) {
    loaded.value = true
    throw new Error('Failed to update profile')
  }

  const data = await response.json()
  console.log('Profile updated:', data)
  selectedUser.value = null
  EditModal.value = false
  showModal.value = false
  fetchUsers()
}

onMounted(() => {
  adminCheck()
  fetchUsers()
  fetchStatistics()
  fetchRoles()
})
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.user-management {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
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

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.role-box {
  background-color: #f9f9f9; /* Light background for better visibility */
  border: 1px solid #ddd; /* Border to define the box */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding for spacing */
  margin-top: 10px; /* Space above the role box */
}

.user-avatar {
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center the avatar */
  margin-top: 15px; /* Space above the avatar */
}

.user-avatar img {
  width: 100px; /* Set a fixed width for the avatar */
  height: 100px; /* Set a fixed height for the avatar */
  border-radius: 50%; /* Make the avatar circular */
  object-fit: cover; /* Ensure the image covers the area without distortion */
}
</style>
