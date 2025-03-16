import { defineStore } from 'pinia'

export const useDevStore = defineStore('devStore', {
  state: () => {
    return {
      Cardinal: 'NOT AVAILABLE',

      Version: 'NewRiseFront@1.5.7',

      host: 'https://newriseback.ru/public/api',
      // host: 'http://127.0.0.1:8000/api',
    }
  },
})
