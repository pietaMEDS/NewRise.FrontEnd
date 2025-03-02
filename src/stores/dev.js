import { defineStore } from 'pinia'

export const useDevStore = defineStore('devStore', {
  state: () => ({
    host: 'http://localhost:8000/api',
  }),
})
