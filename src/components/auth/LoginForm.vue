<template>
  <form @submit.prevent="submitLogin">
    <InputField
      v-model="username"
      label="Username"
      id="username"
      type="text"
      placeholder="johndoe"
    />
    <InputField
      v-model="password"
      label="Password"
      id="password"
      type="password"
      placeholder="*****"
    />
    <AuthButton type="submit" variant="btn-primary w-100">Login</AuthButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue'
import AuthButton from './AuthButton.vue'

const username = ref('')
const password = ref('')

const submitLogin = () => {
  console.log('Login data:', username.value, password.value)
}
</script>
