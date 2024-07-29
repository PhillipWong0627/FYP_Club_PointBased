<template>
    <div class="bg-gray-50 text-black py-1 px-10 shadow flex justify-between ">
        <div class="flex  w[30%] ">
            <img style="width: 16px; height: 16px;" class="mt-2" src="@/assets/navBar/location.png" alt="Location Icon">
            <span
                class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 items-center text-xs uppercase font-bold flex">Club
                Management System</span>
        </div>

        <div v-if="loading" class="loading flex items-center text-sm uppercase font-bold">
            Loading...
        </div>

        <div v-if="!loading && dailyForecast.length" class="forecast-list  w-[40%]">
            <div class="day flex items-center text-sm  uppercase font-bold" v-for="(forecast, index) in dailyForecast"
                :key="index">
                <p class="px-1 lg:block hidden text-xs">{{ forecast.date }}</p>
                <img :src="'http://openweathermap.org/img/w/' + forecast.icon + '.png'" alt="Weather Icon"
                    class="weather-icon" />
                <p class="px-1 ">{{ forecast.temp_max }} °C</p>
            </div>
        </div>


    </div>
</template>

<script>
import axios from "axios";

const apikey = "feff206daa60b539abe8fae8f2ab7f29";

export default {
    name: "App",
    data() {
        return {
            city: "",
            weatherData: null,
            // hourlyForecast: [],
            dailyForecast: [],
            loading: false,
        };
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async fetchCurrentLocationWeather() {
            this.loading = true;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    await this.fetchWeatherData(url);
                });
            } else {
                this.loading = false;
                console.error("Geolocation is not supported by this browser.");
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
                await this.fetchForecast(this.weatherData.name);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                this.loading = false;
            }
        },
        async fetchForecast(city) {
            const urlcast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
            try {
                const response = await axios.get(urlcast);
                const forecast = response.data;
                // this.hourForecast(forecast);    
                this.dayForecast(forecast);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
            }
        },
        // hourForecast(forecast) {
        //     this.hourlyForecast = [];
        //     for (let i = 0; i < 5; i++) {
        //         const date = new Date(forecast.list[i].dt * 1000);
        //         this.hourlyForecast.push({
        //             time: date.toLocaleTimeString(undefined, "Asia/Kolkata").replace(":00", ""),
        //             temp_max: Math.floor(forecast.list[i].main.temp_max - 273),
        //             description: forecast.list[i].weather[0].description,
        //         });
        //     }
        // },
        dayForecast(forecast) {
            this.dailyForecast = [];
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const dayAfterTomorrow = new Date(today);
            dayAfterTomorrow.setDate(today.getDate() + 2);
            const dates = [today, tomorrow, dayAfterTomorrow];

            for (let i = 0; i < forecast.list.length; i++) {
                const forecastDate = new Date(forecast.list[i].dt * 1000);
                for (let j = 0; j < dates.length; j++) {
                    const date = dates[j];
                    if (
                        forecastDate.getDate() === date.getDate() &&
                        forecastDate.getMonth() === date.getMonth() &&
                        forecastDate.getFullYear() === date.getFullYear()
                    ) {
                        this.dailyForecast.push({
                            date: date.toLocaleDateString(undefined, { weekday: 'long' }),
                            // date: date.toDateString(undefined, "Asia/Kolkata"),
                            temp_max: Math.floor(forecast.list[i].main.temp_max - 273),
                            icon: forecast.list[i].weather[0].icon,
                        });
                        dates.splice(j, 1);
                        break;
                    }
                }
                if (this.dailyForecast.length >= 3) {
                    break;
                }
            }
        }
    }
};
</script>


<!-- <script>
import axios from "axios";

const apikey = "feff206daa60b539abe8fae8f2ab7f29";

export default {
    name: "App",
    data() {
        return {
            city: "",
            weatherData: null,
            hourlyForecast: [],
            dailyForecast: [],
            loading: false,

        };
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async fetchCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `ht
tp://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    await this.fetchWeatherData(url);
                });
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
                // Fetch forecast data
                await this.fetchForecast(this.weatherData.name);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        async fetchForecast(city) {
            const urlcast =
                `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
            try {
                const response = await axios.get(urlcast);
                const forecast = response.data;
                this.dayForecast(forecast);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
            }
        },

        dayForecast(forecast) {
            this.dailyForecast = [];

            // 获取今天的日期
            const today = new Date();

            // 计算明天和后天的日期
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const dayAfterTomorrow = new Date(today);
            dayAfterTomorrow.setDate(today.getDate() + 2);

            // 创建一个包含今天、明天和后天日期的数组
            const dates = [today, tomorrow, dayAfterTomorrow];

            // 遍历 forecast 列表，只获取今天、明天和后天的数据
            for (let i = 0; i < forecast.list.length; i++) {
                const forecastDate = new Date(forecast.list[i].dt * 1000);
                console.log(forecastDate);

                // 检查 forecastDate 是否在 dates 数组中
                for (let j = 0; j < dates.length; j++) {
                    const date = dates[j];

                    // 比较日期，只获取所需的日期
                    if (forecastDate.getDate() === date.getDate() &&
                        forecastDate.getMonth() === date.getMonth() &&
                        forecastDate.getFullYear() === date.getFullYear()) {

                        this.dailyForecast.push({
                            date: date.toDateString(undefined, "Asia/Kolkata"),
                            temp_max: Math.floor(forecast.list[i].main.temp_max - 273),
                            icon: forecast.list[i].weather[0].icon,
                        });

                        // 从 dates 数组中移除已找到的日期
                        dates.splice(j, 1);
                        break;
                    }
                }

                // 如果已获取所需的三天数据，停止循环
                if (this.dailyForecast.length >= 3) {
                    break;
                }
            }
        }

    },
};


</script> -->

<style scoped>
/* styles.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@300;700&display=swap');


/* Weather Widget */
.weather {
    text-align: center;
    color: #fff;
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: #4caf50;
    border-radius: 1rem;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
}

.weather h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.weather-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(240, 248, 255, 0.5);
}

.temperature {
    font-size: 3rem;
    margin-top: 1rem;
}

.clouds {
    display: inline-block;
    background-color: #f5f5f5;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    color: #4caf50;
}

/* Forecast */

.forecast-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.next {
    width: calc(50% - 1rem);
    padding: 1.5rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
}

.next:hover {
    transform: translateY(-5px);
}

.time {
    font-size: 1.2rem;
    color: #4a90e2;
    margin-bottom: 0.5rem;
}



.desc {
    color: #555;
}

/* Responsive Styles */
@media screen and (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: stretch;
    }

    .search-bar {
        flex-direction: column;
    }

    .search-input,
    .search-button {
        width: 100%;
        border-radius: 0.5rem;
    }

    .search-input {
        margin-right: 0;
        margin-bottom: 1rem;
    }

    .weather-icon {
        width: 20px;
        height: 20px;
    }

    .temperature {
        font-size: 2.5rem;
    }

    .cast-header {
        font-size: 1.2rem;
    }

    .divider {
        height: 7px;
    }

    .next {
        width: 100%;
    }
}
</style>