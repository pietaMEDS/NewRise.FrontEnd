import { defineStore } from 'pinia'

export const useContextAditionsActionsStore = defineStore('additionalContextFunction', {
  state: () => ({
    actions: null,
    DoubleActions: null,
  }),

  actions: {
    setAction(data) {
      this.actions = data
    },
    setDoubleAction(data) {
      this.DoubleActions = data
    },
    clearDoubleAction() {
      this.DoubleActions = null
    },
  },
})
