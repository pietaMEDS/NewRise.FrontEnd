<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useDevStore } from '@/stores/dev'

const devStore = useDevStore()
const loginErr = ref('')
const emailErr = ref('')
const passwordErr = ref('')
const retryPasswordErr = ref('')
const termErr = ref('')

// Add form data refs
const login = ref('')
const email = ref('')
const password = ref('')
const retryPassword = ref('')
const terms = ref(false)

// Add loading state
const isLoading = ref(false)

// Add router and store
const router = useRouter()
const authStore = useAuthStore()

// Add validation function
const validateForm = () => {
  let isValid = true

  // Reset errors
  loginErr.value = ''
  emailErr.value = ''
  passwordErr.value = ''
  retryPasswordErr.value = ''
  termErr.value = ''

  // Validate login
  if (!login.value.trim()) {
    loginErr.value = 'Логин обязателен'
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailErr.value = 'Введите корректный email адрес'
    isValid = false
  }

  // Validate password
  if (password.value.length < 6) {
    passwordErr.value = 'Пароль должен содержать минимум 6 символов'
    isValid = false
  }

  // Validate password match
  if (password.value !== retryPassword.value) {
    retryPasswordErr.value = 'Пароли не совпадают'
    isValid = false
  }

  // Validate terms
  if (!terms.value) {
    termErr.value = 'Необходимо принять условия использования'
    isValid = false
  }

  return isValid
}

// Update submit handler
const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  isLoading.value = true

  try {
    const response = await fetch(devStore.host + '/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        login: login.value,
        email: email.value,
        password: password.value,
        password_confirmation: retryPassword.value,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.log(error)
      if (error.errors) {
        loginErr.value = error.errors.login || ''
        emailErr.value = error.errors.email || ''
        passwordErr.value = error.errors.password || ''
      }
    } else {
      const data = await response.json()
      authStore.setToken(data.token, data.user.id)
      router.push('/profile')
    }
  } catch (err) {
    console.error('Registration failed:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="regForm">
    <form @submit.prevent="handleSubmit">
      <h1>Регистрация</h1>
      <div class="form-group">
        <label for="login">Логин/Отображаемое имя</label>
        <input
          v-model="login"
          type="text"
          class="form-control"
          id="login"
          required
          aria-describedby="login"
          placeholder="Введите логин"
        />
        <small id="loginlHelp" class="form-text text-muted">{{ loginErr }}</small>
      </div>
      <div class="form-group">
        <label for="email">Email адрес</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          required
          aria-describedby="email"
          placeholder="Введите Email адрес"
        />
        <small id="emailHelper" class="form-text text-muted">{{ emailErr }}</small>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
          placeholder="Пароль"
        />
        <small id="passwordHelper" class="form-text text-muted">{{ passwordErr }}</small>
      </div>
      <div class="form-group">
        <label for="retrypassword">Повторение пароля</label>
        <input
          v-model="retryPassword"
          type="password"
          class="form-control"
          id="retrypassword"
          required
          placeholder="Password"
        />
        <small id="retryPasswordHelper" class="form-text text-muted">{{ retryPasswordErr }}</small>
      </div>
      <div class="form-check">
        <input v-model="terms" required type="checkbox" class="form-check-input" id="term" />
        <label class="form-check-label" for="term">Я согласен с Условиями использования</label>
        <small id="termHelper" class="form-text text-muted">{{ termErr }}</small>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Загрузка...' : 'Зарегистрироваться' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
:root {
  overflow: hidden;
}

.regForm {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
  background-image: url('../assets/authback.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.regForm::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.regForm form {
  position: relative;
  z-index: 2;
}

.regForm form {
  height: fit-content;
  width: min(90%, 400px);
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.regForm form:hover {
  transform: translateY(-5px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

label {
  color: white;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.02);
}

/* Add disabled button styles */
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
</style>
