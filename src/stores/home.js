import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const homeStores = defineStore('homeStores', () => {
  const weatherHeaderKey = ref(1);
  const defaultLatLon = ref([-6.21, 106.85]);
  const isFilter = ref(false);
  const unit = ref("")
  const selectedLatLon = ref(defaultLatLon.value);
  const dataWeatherHeader = reactive(
    {
        "location" : "",
        "currentWeather" : {},
        "humidity" : "",
        "uv" : "",
        "pressure" : "",
        "weather" : "",
        "weatherImg" : "",
        "weatherColor" : "grey",
        "unitSymbol" : ""
    }
  );

  const data7Days = []
  const dataWeather7Days = {
      "temp" : "",
      "weather" : "",
      "weatherImg" : "",
      "weatherColor" : "",
      "day" : "",
      "date" : "",
      "unit" : ""
    }

  return {
    weatherHeaderKey,
    dataWeatherHeader,
    data7Days,
    isFilter,
    defaultLatLon,
    selectedLatLon,
    dataWeatherHeader,
    unit,
    dataWeather7Days
  }
})
