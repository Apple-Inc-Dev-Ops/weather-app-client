<template>
    <div 
      class="d-flex container position-relative" 
      style="color: white;"
      :style="{backgroundColor : store.dataWeatherHeader.weatherColor }"
    >
    
    <div class="position-absolute" style="right:30px;top:30px;">
      <img v-if="!isFav" @click="saveLocation()" src="/svg/unstar.svg" class="" width="40" style="cursor:pointer" srcset="">
      <img v-else @click="removeLocation()" src="/svg/star.svg" class="" width="40" style="cursor:pointer" srcset="">
      &nbsp;&nbsp;
      <a 
      style="cursor:pointer"
      target="_blank" 
      :href="`http://wa.me/?text=Forecast On:%0A%0A*${store.dataWeatherHeader.location}*%0A%0AWeather: ${store.dataWeatherHeader.weather}
      %0ATemperature: ${Math.round(Number(store.dataWeatherHeader.currentWeather.temperature))}°c
      %0AWind speed: ${store.dataWeatherHeader.currentWeather.windspeed} Km/h
      %0AHumidity: ${store.dataWeatherHeader.humidity} %
      %0AUV Index: ${store.dataWeatherHeader.uv}
      %0AAir Pressure: ${store.dataWeatherHeader.pressure} hPa`">
        <img src="/svg/whatsapp.svg" width="40" />
      </a>
    </div>

      <div class="d-flex justify-content-center align-items-center" style="width: 250px; height: 250px;">
        <img :src="'/images/' + store.dataWeatherHeader.weatherImg" alt="" width="180" height="180" style="pointer-events: none;">
      </div>
      <div class="d-flex flex-column justify-content-between flex-fill">
        <div class="d-flex mt-5">
          <IconLocation/>
          <h3 class="ms-1 mb-3" style="font-weight: 400;">
            {{ store.dataWeatherHeader.location || "Location" }}
          </h3>
        </div>
        <div class="d-flex flex-row justify-content-between">
          <div class="d-flex flex-column mb-5">
            <h1>
              {{ store.dataWeatherHeader.weather || "Weather" }}
            </h1>
            <h4>
              {{ Math.round(Number(store.dataWeatherHeader.currentWeather.temperature)) || "-" }}{{ store.dataWeatherHeader.unitSymbol }}
            </h4>
          </div>
          <div class="d-flex flex-row align-items-end mb-4 me-4">
            <div class="d-flex flex-row align-items-center ms-3 me-5">
              <IconWind/>
              <div class="ms-2 d-flex flex-column justify-content-center">
                <h5 class="m-0">
                  {{ store.dataWeatherHeader.currentWeather.windspeed || "-" }} 
                  <span style="font-size: small;">
                    Km/h
                  </span>
                </h5>
                <span style="font-size: small; font-weight: 500;">
                  Wind Speed
                </span>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center ms-4 me-5">
              <IconHumidity/>
              <div class="ms-2 d-flex flex-column justify-content-center">
                <h5 class="m-0">
                  {{ store.dataWeatherHeader.humidity || "-" }} %
                </h5>
                <span style="font-size: small; font-weight: 500;">
                  Humidity
                </span>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center ms-4 me-5">
              <IconUV/>
              <div class="ms-2 d-flex flex-column justify-content-center">
                <h5 class="m-0">
                  {{ store.dataWeatherHeader.uv || "-" }}
                </h5>
                <span style="font-size: small; font-weight: 500;">
                  UV Index
                </span>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center ms-4 me-5">
              <IconPressure/>
              <div class="ms-2 d-flex flex-column justify-content-center">
                <h5 class="m-0">
                  {{ store.dataWeatherHeader.pressure || "-" }}
                  <span style="font-size: small;">
                    hPa
                  </span>
                </h5>
                <span style="font-size: small; font-weight: 500;">
                  Air Pressure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import IconLocation from '@/components/icons/IconLocation.vue';
    import IconWind from '@/components/icons/IconWind.vue';
    import IconHumidity from '@/components/icons/IconHumidity.vue';
    import IconUV from '@/components/icons/IconUV.vue';
    import IconPressure from '@/components/icons/IconPressure.vue';
    import axios from 'axios';
    import { toggleFavorites, getFavorites } from '@/utils/favorites';
    import {homeStores} from '@/stores/home';
    import {ref} from 'vue';

    const store = homeStores();
    const isFav = ref(false);

    async function saveLocation() {
      await toggleFavorites(store.selectedLatLon[0], store.selectedLatLon[1]);
      checkIsFav();
    }

    async function removeLocation() {
      await toggleFavorites(store.selectedLatLon[0], store.selectedLatLon[1]);
      await checkIsFav();
    }

    async function checkIsFav() {
      const favLoc = (await getFavorites()).data;

      for (const location of favLoc) {
        if(location.lat == store.selectedLatLon[0] && location.long == store.selectedLatLon[1]) {
          isFav.value = true;
          return;
        }
      }
      isFav.value = false;
    }

    function setWeather(val){
      if(store.dataWeatherHeader.currentWeather.is_day == 0){
          if(val == 0 || val == 1){
          store.dataWeatherHeader.weather = "Clear"
          store.dataWeatherHeader.weatherImg = "moonIcon.png"
          store.dataWeatherHeader.weatherColor = "#11316a"
          }

          else if(val == 2 || val == 3){
          store.dataWeatherHeader.weather = "Cloudy"
          store.dataWeatherHeader.weatherImg = "cloudyNightIcon.png"
          store.dataWeatherHeader.weatherColor = "#1c1d4b"
          }

          else if(val == 45 || val == 48){
          store.dataWeatherHeader.weather = "Foggy"
          store.dataWeatherHeader.weatherImg = "foggyNightIcon.png"
          store.dataWeatherHeader.weatherColor = "#778899"
          }
      }

      else if(store.dataWeatherHeader.currentWeather.is_day == 1){
          if(val == 0 || val == 1){
          store.dataWeatherHeader.weather = "Clear"
          store.dataWeatherHeader.weatherImg = "sunIcon.png"
          store.dataWeatherHeader.weatherColor = "#48cbff"
          }

          else if(val == 2 || val == 3){
          store.dataWeatherHeader.weather = "Cloudy"
          store.dataWeatherHeader.weatherImg = "cloudyDayIcon.png"
          store.dataWeatherHeader.weatherColor = "#49adf9"
          }

          else if(val == 45 || val == 48){
          store.dataWeatherHeader.weather = "Foggy"
          store.dataWeatherHeader.weatherImg = "foggyDayIcon.png"
          store.dataWeatherHeader.weatherColor = "#778899"
          }
      }

      if(val == 51 || val == 53 || val == 55 || val == 56 || val == 57){
          store.dataWeatherHeader.weather = "Drizzle"
          store.dataWeatherHeader.weatherImg = "drizzleIcon.png"
          store.dataWeatherHeader.weatherColor = "#3f7cd7"
      }

      else if(val == 61 || val == 63 || val == 65 || val == 66 || val == 67 || val == 80 || val == 81 || val == 82 || val == 85 || val == 86){
          store.dataWeatherHeader.weather = "Rain"
          store.dataWeatherHeader.weatherImg = "rainIcon.png"
          store.dataWeatherHeader.weatherColor = "#01487e"
      }

      else if(val == 71 || val == 73 || val == 75 || val == 77){
          store.dataWeatherHeader.weather = "Snow"
          store.dataWeatherHeader.weatherImg = "snowIcon.png"
          store.dataWeatherHeader.weatherColor = "#6bb5da"
      }

      else if(val == 95 || val == 96 || val == 99){
          store.dataWeatherHeader.weather = "Thunderstorm"
          store.dataWeatherHeader.weatherImg = "thunderstormIcon.png"
          store.dataWeatherHeader.weatherColor = "#6840a3"
      }
    }

    async function getData(lat, long, unit){
    try {
        const weather = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,uv_index,is_day,pressure_msl${unit}&current_weather=true&forecast_days=1&timezone=Asia%2FBangkok`
        );
        const currentIdx = weather.data.hourly.time.indexOf(weather.data.current_weather.time);

        store.dataWeatherHeader.currentWeather = weather.data.current_weather;

        store.dataWeatherHeader.humidity = weather.data.hourly.relativehumidity_2m[currentIdx];

        store.dataWeatherHeader.uv = weather.data.hourly.uv_index[currentIdx];

        store.dataWeatherHeader.pressure = weather.data.hourly.pressure_msl[currentIdx];

        store.dataWeatherHeader.unitSymbol = weather.data.hourly_units.temperature_2m

        setWeather(weather.data.current_weather.weathercode);
    } catch (error) {
        console.log(error)
    }
    }

    async function getLocationName(lat, long){
        try {
            const location = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
            );
            store.dataWeatherHeader.location = location.data.address.city + ", " + location.data.address.country
        } catch (error) {
            console.log(error)
        }
    }

    getData(store.selectedLatLon[0], store.selectedLatLon[1], store.unit);
    getLocationName(store.selectedLatLon[0], store.selectedLatLon[1]);
    checkIsFav();
</script>