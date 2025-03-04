import { defineStore } from 'pinia'

export const useDevStore = defineStore('devStore', {
  state: () => ({
    host: 'http://127.0.0.1:8000/api',
  }),
})
