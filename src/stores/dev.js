import { defineStore } from 'pinia'

export const useDevStore = defineStore('devStore', {
  state: () => ({
    host: '/api',
  }),
})
