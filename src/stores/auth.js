import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user_id: null,
  }),

  actions: {
    setToken(token, userId) {
      this.token = token
      this.user_id = userId // Add user_id to the state
      localStorage.setItem('token', token)
      localStorage.setItem('user_id', userId) // Save user_id to localStorage
    },

    clearToken() {
      const router = useRouter()
      this.token = null
      this.user_id = null // Clear user_id from the state
      localStorage.removeItem('token')
      localStorage.removeItem('user_id') // Remove user_id from localStorage
      router.push('/login')
    },

    // Helper method to check if user is authenticated
    isAuthenticated() {
      if (this.token == null) {
        return false
      }
      return !!this.token
    },
  },

  // Optionally initialize token from localStorage
  hydrate() {
    this.token = localStorage.getItem('token')
  },
})
