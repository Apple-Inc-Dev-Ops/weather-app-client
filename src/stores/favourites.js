import { ref } from 'vue'
import { defineStore } from 'pinia'

export const favouritesStores = defineStore('favouritesStores', () => {
  const weatherHeaderKey = ref(1)

  return {
    weatherHeaderKey
  }
})
