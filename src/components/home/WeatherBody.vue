<template>
    <div class="mt-3 d-flex container">
        <div class="flex-fill row container p-0">
            <div 
            class="col px-2"
            v-for="(i, index) in store.data7Days"
            :key="index"
            >
                <div class="d-flex flex-column align-items-center p-2" style="background-color: lightslategray; border-radius: 5%;">
                    <div class="d-flex flex-column align-items-center text-white">
                        <h3>
                            {{ i["day"] }}
                        </h3>
                        <span style="font-size: 13px;">
                            {{ i["date"] }}
                        </span>
                    </div>
                    <div 
                    class="d-flex justify-content-center align-items-center my-3" 
                    style="width: 100px; height: 100px; border-radius: 50%;"
                    :style="{backgroundColor : i['weatherColor']}"
                    >
                        <img :src="'/images/' + i['weatherImg']" alt="" width="70" height="70" style="pointer-events: none;">
                    </div>
                    <div class="d-flex flex-column align-items-center text-white">
                        <span style="font-size: 20px;">
                            {{ Math.round(Number(i['temp'])) }}{{ store.dataWeather7Days.unit }}
                        </span>
                        <h5>
                            {{ i['weather'] }}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import moment from 'moment';
    import { homeStores } from '../../stores/home';

    const store = homeStores();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + 1)
    startDate = moment(startDate).format("YYYY-MM-DD")
    
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7)
    endDate = moment(endDate).format("YYYY-MM-DD")

    function setWeather(val){
        if(val == 0 || val == 1){
        store.dataWeather7Days.weather = "Clear"
        store.dataWeather7Days.weatherImg = "sunIcon.png"
        store.dataWeather7Days.weatherColor = "#48cbff"
        }

        else if(val == 2 || val == 3){
        store.dataWeather7Days.weather = "Cloudy"
        store.dataWeather7Days.weatherImg = "cloudyDayIcon.png"
        store.dataWeather7Days.weatherColor = "#49adf9"
        }

        else if(val == 45 || val == 48){
        store.dataWeather7Days.weather = "Foggy"
        store.dataWeather7Days.weatherImg = "foggyDayIcon.png"
        store.dataWeather7Days.weatherColor = "#778899"
        }

        else if(val == 51 || val == 53 || val == 55 || val == 56 || val == 57){
            store.dataWeather7Days.weather = "Drizzle"
            store.dataWeather7Days.weatherImg = "drizzleIcon.png"
            store.dataWeather7Days.weatherColor = "#3f7cd7"
        }

        else if(val == 61 || val == 63 || val == 65 || val == 66 || val == 67 || val == 80 || val == 81 || val == 82 || val == 85 || val == 86){
            store.dataWeather7Days.weather = "Rain"
            store.dataWeather7Days.weatherImg = "rainIcon.png"
            store.dataWeather7Days.weatherColor = "#01487e"
        }

        else if(val == 71 || val == 73 || val == 75 || val == 77){
            store.dataWeather7Days.weather = "Snow"
            store.dataWeather7Days.weatherImg = "snowIcon.png"
            store.dataWeather7Days.weatherColor = "#6bb5da"
        }

        else if(val == 95 || val == 96 || val == 99){
            store.dataWeather7Days.weather = "Thunderstorm"
            store.dataWeather7Days.weatherImg = "thunderstormIcon.png"
            store.dataWeather7Days.weatherColor = "#6840a3"
        }
    }

    async function getData(lat, long, unit){
        try {
            const data = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max${unit}&start_date=${startDate}&end_date=${endDate}&timezone=Asia%2FBangkok`)
            for(let d in data.data.daily.time){
                const date = new Date(data.data.daily.time[d])
                store.dataWeather7Days.temp = data.data.daily.temperature_2m_max[d]
    
                store.dataWeather7Days.date = moment(date).format("DD MMMM, YYYY")
    
                store.dataWeather7Days.day = moment(date).format("dddd")

                store.dataWeather7Days.unit = data.data.daily_units.temperature_2m_max
    
                setWeather(data.data.daily.weathercode[d])
                store.data7Days.push({...store.dataWeather7Days})
            }  
        } catch (error) {
            console.log(error)
        }
    }

    store.data7Days = []
    getData(store.selectedLatLon[0], store.selectedLatLon[1], store.unit)
</script>