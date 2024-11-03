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
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import InputField from './InputField.vue'
import AuthButton from './AuthButton.vue'

const username = ref('')
const password = ref('')
const router = useRouter()

const submitLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()
    if (data.status === 'SUCCESS') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', data.data.id)
      localStorage.setItem('username', data.data.username)

      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You will be redirected shortly.',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      })
      router.push('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: data.error || 'Something went wrong, please try again.'
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to connect to the server. Please try again later.'
    })
  }
}
</script>
