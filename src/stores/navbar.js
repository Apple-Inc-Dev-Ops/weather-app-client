import { ref } from 'vue'
import { defineStore } from 'pinia'

export const navbarStores = defineStore('navbarStores', () => {
  const bgDarkColor = ref('#1A1A1A')
  const bgDarkNavbar = ref('#333333')

  const bgLightColor = ref('#f8f9fa')
  const bgLightNavbar = ref('#FFFFFF')

  return {
    dark: {
      bg: bgDarkColor,
      navbar: bgDarkNavbar
    },
    light: {
      bg: bgLightColor,
      navbar: bgLightNavbar
    }
  }
})
