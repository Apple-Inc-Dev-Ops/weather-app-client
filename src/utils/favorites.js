import axios from '../config/axios'

export async function getFavorites() {
  return (await axios.get(`/favorites/${localStorage.getItem('username')}`)).data
}

export async function toggleFavorites(lat, long) {
  return (
    await axios.put('/favorites/toggle', {
      username: localStorage.getItem('username'),
      lat: Number(lat),
      long: Number(long)
    })
  ).data
}
