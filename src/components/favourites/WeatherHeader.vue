<template>
    <div 
      class="d-flex container position-relative" 
      style="color: white;background-color: ;"
      :style="{backgroundColor : weather.weatherColor }"
    >
    
    <div class="position-absolute" style="right:30px;top:30px;">
      <img v-if="!isFav" @click="saveLocation()" src="/svg/unstar.svg" class="" width="40" style="cursor:pointer" srcset="">
      <img v-else @click="removeLocation()" src="/svg/star.svg" class="" width="40" style="cursor:pointer" srcset="">
      &nbsp;&nbsp;
      <a 
      style="cursor:pointer"
      target="_blank" 
      :href="`http://wa.me/?text=Forecast On:%0A%0A*${weather.location}*%0A%0AWeather: ${weather.weather}
      %0ATemperature: ${Math.round(Number(weather.currentWeather.temperature))}°c
      %0AWind speed: ${weather.currentWeather.windspeed} Km/h
      %0AHumidity: ${weather.humidity} %
      %0AUV Index: ${weather.uv}
      %0AAir Pressure: ${weather.pressure} hPa`">
        <img src="/svg/whatsapp.svg" width="40" />
      </a>
    </div>

      <div class="d-flex justify-content-center align-items-center" style="width: 250px; height: 250px;">
        <img :src="'/images/' + weather.weatherImg" alt="" width="180" height="180" style="pointer-events: none;">
      </div>
      <div class="d-flex flex-column justify-content-between flex-fill">
        <div class="d-flex mt-5">
          <IconLocation/>
          <h3 class="ms-1 mb-3" style="font-weight: 400;">
            {{ weather.location || "Location" }}
          </h3>
        </div>
        <div class="d-flex flex-row justify-content-between">
          <div class="d-flex flex-column mb-5">
            <h1>
              {{ weather.weather || "Weather" }}
            </h1>
            <h4>
              {{ Math.round(Number(weather.currentWeather.temperature)) || "-" }}{{ weather.unitSymbol }}
            </h4>
          </div>
          <div class="d-flex flex-row align-items-end mb-4 me-4">
            <div class="d-flex flex-row align-items-center ms-3 me-5">
              <IconWind/>
              <div class="ms-2 d-flex flex-column justify-content-center">
                <h5 class="m-0">
                  {{ weather.currentWeather.windspeed || "-" }} 
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
                  {{ weather.humidity || "-" }} %
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
                  {{ weather.uv || "-" }}
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
                  {{ weather.pressure || "-" }}
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
    import {ref} from 'vue';
    import { homeStores } from '../../stores/home';

    const homeStore = homeStores();
    const props = defineProps({
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        }
    });

    const weather = ref({
        "location" : "",
        "currentWeather" : {},
        "humidity" : "",
        "uv" : "",
        "pressure" : "",
        "weather" : "",
        "weatherImg" : "",
        "weatherColor" : "grey"
    });
    const isFav = ref(false);

    function saveLocation() {
      const favouriteLocations = JSON.parse(localStorage.getItem('favouriteLocations') ?? '[]');

      favouriteLocations.push({
        lat: props.lat,
        lon: props.lon
      });
      localStorage.setItem('favouriteLocations', JSON.stringify(favouriteLocations));
      checkIsFav();
    }

    function removeLocation() {
      const favouriteLocations = JSON.parse(localStorage.getItem('favouriteLocations') ?? '[]');
      localStorage.setItem('favouriteLocations', JSON.stringify(favouriteLocations.filter((l) => l.lon != props.lon && l.lat != props.lat)));
      checkIsFav();
    }

    function checkIsFav() {
      const favLoc = localStorage.getItem('favouriteLocations') ?? '[]';

      for (const location of JSON.parse(favLoc)) {
        if(location.lat == props.lat && location.lon == props.lon) {
          isFav.value = true;
          return;
        }
      }
      isFav.value = false;
    }

    function setWeather(val){
      if(weather.value.currentWeather.is_day == 0){
          if(val == 0 || val == 1){
          weather.value.weather = "Clear"
          weather.value.weatherImg = "moonIcon.png"
          weather.value.weatherColor = "#11316a"
          }

          else if(val == 2 || val == 3){
          weather.value.weather = "Cloudy"
          weather.value.weatherImg = "cloudyNightIcon.png"
          weather.value.weatherColor = "#1c1d4b"
          }

          else if(val == 45 || val == 48){
          weather.value.weather = "Foggy"
          weather.value.weatherImg = "foggyNightIcon.png"
          weather.value.weatherColor = "#778899"
          }
      }

      else if(weather.value.currentWeather.is_day == 1){
          if(val == 0 || val == 1){
          weather.value.weather = "Clear"
          weather.value.weatherImg = "sunIcon.png"
          weather.value.weatherColor = "#48cbff"
          }

          else if(val == 2 || val == 3){
          weather.value.weather = "Cloudy"
          weather.value.weatherImg = "cloudyDayIcon.png"
          weather.value.weatherColor = "#49adf9"
          }

          else if(val == 45 || val == 48){
          weather.value.weather = "Foggy"
          weather.value.weatherImg = "foggyDayIcon.png"
          weather.value.weatherColor = "#778899"
          }
      }

      if(val == 51 || val == 53 || val == 55 || val == 56 || val == 57){
          weather.value.weather = "Drizzle"
          weather.value.weatherImg = "drizzleIcon.png"
          weather.value.weatherColor = "#3f7cd7"
      }

      else if(val == 61 || val == 63 || val == 65 || val == 66 || val == 67 || val == 80 || val == 81 || val == 82 || val == 85 || val == 86){
          weather.value.weather = "Rain"
          weather.value.weatherImg = "rainIcon.png"
          weather.value.weatherColor = "#01487e"
      }

      else if(val == 71 || val == 73 || val == 75 || val == 77){
          weather.value.weather = "Snow"
          weather.value.weatherImg = "snowIcon.png"
          weather.value.weatherColor = "#6bb5da"
      }

      else if(val == 95 || val == 96 || val == 99){
          weather.value.weather = "Thunderstorm"
          weather.value.weatherImg = "thunderstormIcon.png"
          weather.value.weatherColor = "#6840a3"
      }
    }

    async function getData(lat, long, unit) {
    try {
        const getWeather = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,uv_index,is_day,pressure_msl${unit}&current_weather=true&forecast_days=1&timezone=Asia%2FBangkok`
        );
        const currentIdx = getWeather.data.hourly.time.indexOf(getWeather.data.current_weather.time);

        weather.value.currentWeather = getWeather.data.current_weather;

        weather.value.humidity = getWeather.data.hourly.relativehumidity_2m[currentIdx];

        weather.value.uv = getWeather.data.hourly.uv_index[currentIdx];

        weather.value.pressure = getWeather.data.hourly.pressure_msl[currentIdx];

        weather.value.unitSymbol = getWeather.data.hourly_units.temperature_2m;

        setWeather(getWeather.data.current_weather.weathercode);
    } catch (error) {
        console.log(error)
    }
    }

    async function getLocationName(lat, long){
        try {
            const location = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
            );
            weather.value.location = location.data.address.city + ", " + location.data.address.country
        } catch (error) {
            console.log(error)
        }
    }

    getData(props.lat, props.lon, homeStore.unit);
    getLocationName(props.lat, props.lon);
    checkIsFav();
</script>