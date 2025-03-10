<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1>Войти</h1>

      <div class="form-group">
        <label for="email">Email адрес</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Введите вашу почту"
          class="form-control"
        />
        <small class="form-text text-muted">{{ emailErr }}</small>
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Введите ваш пароль"
          class="form-control"
        />
        <small class="form-text text-muted">{{ passwordErr }}</small>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Загрузка...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useDevStore } from '@/stores/dev'

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const emailErr = ref('')
    const passwordErr = ref('')
    const isLoading = ref(false)
    const mainerr = ref('')

    const router = useRouter()
    const authStore = useAuthStore()

    const validateForm = () => {
      let isValid = true
      emailErr.value = ''
      passwordErr.value = ''

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        emailErr.value = 'Введите действительный адрес электронной почты'
        isValid = false
      }

      if (password.value.length < 6) {
        passwordErr.value = 'Пароль должен быть длиннее 6 символов'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      isLoading.value = true
      try {
        const response = await fetch(`${useDevStore().host}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        })

        if (response.status == 401) {
          const error = await response.json()
          passwordErr.value = 'Неверные данные'
        } else {
          const data = await response.json()
          authStore.setToken(data.token, data.user.id)
          router.push('/forum')
        }
      } catch (error) {
        mainerr.value.err = 'Произошла ошибка попробуйте в следующий раз'
        console.error('Login error:', error)
      } finally {
        isLoading.value = false
      }
    }

    return {
      email,
      password,
      emailErr,
      passwordErr,
      isLoading,
      handleLogin,
    }
  },
}
</script>

<style scoped>
.login-container {
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
  position: sticky;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.login-form {
  position: relative;
  z-index: 2;
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

.login-form:hover {
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
  width: 100%;
  padding: 8px;
  border-radius: 4px;
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
  display: block;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  transform: scale(1.02);
  background-color: #0056b3;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.form-text {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
