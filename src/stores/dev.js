import { defineStore } from 'pinia'

export const useDevStore = defineStore('devStore', {
  state: () => ({
    Version: 'NewRiseFront@1.2.2',

    host: 'https://newriseback.ru/public/api',
    // host: 'http://127.0.0.1:8000/api',
  }),
})
