<template>
  <WeatherHeader :key="store.weatherHeaderKey" />
  <WeatherBody :key="store.weatherHeaderKey"/>
</template>

<script setup>
  import WeatherHeader from '@/components/home/WeatherHeader.vue';
  import WeatherBody from '../components/home/WeatherBody.vue';
  import {homeStores} from '@/stores/home';

  const store = homeStores();
</script>