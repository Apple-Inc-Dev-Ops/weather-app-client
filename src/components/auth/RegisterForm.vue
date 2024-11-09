<template>
  <form @submit.prevent="submitRegister">
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
    <AuthButton type="submit" variant="btn-primary w-100">Register</AuthButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import InputField from './InputField.vue'
import AuthButton from './AuthButton.vue'
import { register } from '../../utils/auth'

const username = ref('')
const password = ref('')
const router = useRouter()

const submitRegister = async () => {
  try {
    const data = await register(username.value, password.value)

    if (data.status === 'SUCCESS') {
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created successfully!',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      })
      router.push('/login')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
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
