import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user_id: null,
    fingerprint: null,
    c_fingerprint: null,
  }),

  actions: {
    getTokenFromSession() {
      this.token = sessionStorage.getItem('token')
      this.user_id = sessionStorage.getItem('user_id')
    },

    setToken(token, userId) {
      this.token = token
      this.user_id = userId // Add user_id to the state
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user_id', userId)
    },

    clearToken() {
      const router = useRouter()
      this.token = null
      this.user_id = null // Clear user_id from the state
      sessionStorage.removeItem('user_id') // Remove user_id from localStorage
      sessionStorage.removeItem('token')
      router.push('/login')
    },

    // Helper method to check if user is authenticated
    isAuthenticated() {
      if (this.token == null) {
        return false
      }
      return !!this.token
    },

    setFingerprints(fingerprints) {
      this.fingerprint = fingerprints.main
      this.c_fingerprint = fingerprints.custom
    },
  },

  // Optionally initialize token from localStorage
  hydrate() {
    this.token = localStorage.getItem('token')
  },
})
