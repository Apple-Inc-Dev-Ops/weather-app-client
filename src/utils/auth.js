import axios from '../config/axios'

export async function login (username, password) {
  const response = await axios.post('/auth/login', {
    username,
    password
  })
  return response.data
}

export async function register (username, password) {
  const response = await axios.post('/auth/register', {
    username,
    password
  })
  return response.data
}
