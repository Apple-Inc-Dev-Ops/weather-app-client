<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 30rem">
      <h3 class="text-center mb-4 fw-bold">LOGIN</h3>
      <LoginForm />
      <p class="mt-3 text-center">
        Don't have an account?
        <router-link to="/register" class="text-primary" style="text-decoration: none"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
</script>
