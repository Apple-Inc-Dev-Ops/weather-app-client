<template>
  <div :key="favouritesStore.weatherHeaderKey">
    <div class="text-end px-3 mx-5">
      <button :class="`btn mb-3 ${mode === 'light' ? 'btn-primary' : 'btn-light'}`" @click="share()">
        <img src="/svg/share.svg" width="20" />
        &nbsp;
        Share my favourites
      </button>
    </div>

    <div class="overflow-auto" style="height:80vh">
      <div class="mb-3" v-for="fav in favs" :key="`${fav.lat}-${fav.lon}`">
        <WeatherHeader :lat="Number(fav.lat)" :lon="Number(fav.lon)" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import WeatherHeader from '../components/favourites/WeatherHeader.vue';
  import {ref} from 'vue';
  import { favouritesStores } from '../stores/favourites';

  const mode = ref(localStorage.getItem('mode') ?? 'light');
  const favouritesStore = favouritesStores();
  const favLocation = localStorage.getItem('favouriteLocations');
  const favs = ref(JSON.parse(favLocation ?? '[]'));

  async function share() {
    const url = `${window.location.origin}/collection/${window.btoa(favLocation)}`;
    await navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  }
</script>