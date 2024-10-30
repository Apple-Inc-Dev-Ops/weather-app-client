<template>
  <NavigationBar v-if="!hideNavbar" />

  <div
    :class="`py-3 d-flex flex-column ${mode === 'light' ? 'bg-light' : 'bg-dark'}`"
    style="height: 100vh"
  >
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import { ref, computed } from 'vue'

const route = useRoute()

const mode = ref(localStorage.getItem('mode') ?? 'light')

const hideNavbar = computed(() => {
  return route.path === '/login' || route.path === '/register' || route.path === '/loading'
})
</script>
