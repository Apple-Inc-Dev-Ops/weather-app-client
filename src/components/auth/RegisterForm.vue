<template>
  <form @submit.prevent="submitRegister">
    <InputField v-model="name" label="Name" id="name" type="name" placeholder="John Doe" />
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
    <AuthButton type="submit" variant="btn-primary w-100">Register</AuthButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue'
import AuthButton from './AuthButton.vue'

const name = ref('')
const email = ref('')
const password = ref('')

const submitRegister = () => {
  console.log('Register data:', name.value, email.value, password.value)
}
</script>
