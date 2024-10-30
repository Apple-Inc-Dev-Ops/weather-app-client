<template>
  <div class="loading-screen">
    <img src="../../images/loading.gif" alt="Loading..." class="loading-gif" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/login')
  }, 3000)
})
</script>

<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fcfefc;
  overflow: hidden;
  z-index: 9999;
}

.loading-gif {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
