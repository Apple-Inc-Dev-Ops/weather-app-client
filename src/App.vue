<template>
  <Navbar />

  <div :class="`py-3 d-flex flex-column ${mode === 'light' ? 'bg-light' : 'bg-dark'}`" style="height:100vh">
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import {ref} from 'vue';

  const mode = ref(localStorage.getItem('mode') ?? 'light');
</script>