<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 30rem">
      <h3 class="text-center mb-4 fw-bold">REGISTER</h3>
      <RegisterForm />
      <p class="mt-3 text-center">
        Already have an account?
        <router-link to="/login" class="text-primary" style="text-decoration: none"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>
