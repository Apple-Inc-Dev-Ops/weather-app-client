<template>
  <form @submit.prevent="submitLogin">
    <InputField
      v-model="email"
      label="Email"
      id="email"
      type="email"
      placeholder="example@example.com"
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

const email = ref('')
const password = ref('')

const submitLogin = () => {
  console.log('Login data:', email.value, password.value)
}
</script>
