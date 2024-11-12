<template>
  <nav :class="`navbar navbar-expand-lg ${mode === 'light' ? 'bg-light' : 'bg-dark'}`">
    <div class="container">

      <div>
        <img src="/images/logo.png" width="30" height="30" alt="">
        &nbsp;
        <span class="fw-bold fs-5">Apple Weather</span>
        &emsp;
      </div>

      <a class="navbar-brand" href="#">
        <form class="d-flex dropdown" @submit.prevent="findCities()">
          <input
            @keyup="findCities()"
            v-model="city"
            class="form-control me-2 form-control-sm small"
            type="search"
            placeholder="Find City"
            aria-label="Search"
          />

          <button v-if="isLoading" class="bg-transparent border-0">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>

          <button v-if="homeStore.isFilter" @click="removeFilter()" class="btn btn-sm btn-danger">
            <i class="fas fa-times"></i>
          </button>

          <ul
            v-if="cities.length > 0"
            class="dropdown-menu show"
            aria-labelledby="dropdownMenu2"
            data-bs-popper="static"
          >
            <li v-for="city in cities" :key="city.display_name">
              <button @click="selectCity(city)" class="dropdown-item" type="button">
                {{ city.display_name }}
              </button>
            </li>
          </ul>
        </form>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul :class="`navbar-nav me-auto mb-2 mb-lg-0`">
          <li class="nav-item">
            <router-link
              :class="`nav-link ${mode === 'light' ? 'text-dark' : 'text-light'}`"
              active-class="active"
              to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :class="`nav-link ${mode === 'light' ? 'text-dark' : 'text-light'}`"
              active-class="active"
              to="/favourites"
              >Favourites</router-link
            >
          </li>
        </ul>
        <form class="d-flex">
          <div class="form-check form-switch">
            <input
              @change="setMode($event.target.checked)"
              :checked="mode === 'dark'"
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
            <label
              :class="`${mode === 'light' ? 'text-dark' : 'text-light'} form-check-label small`"
              for="flexSwitchCheckChecked"
              >Dark mode</label
            >
          </div>
        </form>
        <div class="mx-3">
          <button
            type="button"
            class="btn me-2"
            :class="{
              'btn-primary': homeStore.unit == '',
              'btn-light': homeStore.unit == '&temperature_unit=fahrenheit'
            }"
            @click="celcius"
          >
            Celcius
          </button>
          <button
            type="button"
            class="btn"
            :class="{
              'btn-primary': homeStore.unit == '&temperature_unit=fahrenheit',
              'btn-light': homeStore.unit == ''
            }"
            @click="fahrenheit"
          >
            Fahrenheit
          </button>
        </div>
        <div v-if="isLoggedIn" class="d-flex align-items-center">
          <span :class="`me-3 ${mode === 'light' ? 'text-dark' : 'text-light'}`">{{
            username
          }}</span>
          <button @click="logout" class="btn btn-outline-danger btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { homeStores } from '../stores/home'
import { favouritesStores } from '../stores/favourites'

const mode = ref(localStorage.getItem('mode') ?? 'light')
const favouritesStore = favouritesStores()
const homeStore = homeStores()
const cities = ref([])
const isLoading = ref(false)
const city = ref('')
const timeoutId = ref(null)
const selectedCity = ref(null)

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const username = ref(localStorage.getItem('username') || '')

const router = useRouter()

function logout() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  isLoggedIn.value = false
  username.value = ''
  router.push('/loading')
}

function celcius() {
  homeStore.unit = ''
  homeStore.weatherHeaderKey++
  favouritesStore.weatherHeaderKey++
}

function fahrenheit() {
  homeStore.unit = '&temperature_unit=fahrenheit'
  homeStore.weatherHeaderKey++
  favouritesStore.weatherHeaderKey++
}

async function findCities() {
  try {
    cities.value = []

    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    if (city.value.length > 0) {
      timeoutId.value = setTimeout(async () => {
        isLoading.value = true
        const getCities = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&city=${city.value}`
        )
        cities.value = getCities.data
        isLoading.value = false
      }, 500)
    }
  } catch (error) {
    isLoading.value = false
  }
}

function removeFilter() {
  try {
    homeStore.isFilter = false
    city.value = ''
    homeStore.selectedLatLon = homeStore.defaultLatLon
    homeStore.weatherHeaderKey++
  } catch (error) {
    console.error(error)
  }
}

function selectCity({ display_name, lon, lat }) {
  try {
    selectedCity.value = {
      display_name,
      lon,
      lat
    }
    cities.value = []
    city.value = display_name
    homeStore.isFilter = true

    homeStore.selectedLatLon = [lat, lon]
    homeStore.weatherHeaderKey++
  } catch (error) {
    console.error(error)
  }
}

function setMode(val) {
  if (val) {
    localStorage.setItem('mode', 'dark')
    location.reload()
  } else {
    localStorage.setItem('mode', 'light')
    location.reload()
  }
}
</script>
