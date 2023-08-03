import { IP_INFO_API, IP_INFO_TOKEN, WEATHER_API, WEATHER_API_KEY, COUNTRIES_INFO_API } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
    userLocationWeather: {

    },
    searchLocationWeather: {

    }
};

const createDataObject = function(weatherData) {
    return {
        city: weatherData.location.name,
        country: weatherData.location.country,
        localTime: weatherData.location.localtime,
        tempC: weatherData.current.temp_c,
        isDay: weatherData.current.is_day,
        weatherType: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_kph,
        sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
        sunset: weatherData.forecast.forecastday[0].astro.sunset,
    }
}

// Location weather
const locationWeather = async function(query) {
    try {
        const weatherData = await getJson(`${WEATHER_API}forecast.json?key=${WEATHER_API_KEY}&q=${query}`);
        return weatherData;

    } catch (err) {
        throw err;
    }
}

// User location info
const userLocationCity = async function() {
    try {
        const data = await getJson(`${IP_INFO_API}token=${IP_INFO_TOKEN}`);
        return data.city;

    } catch (err) {
        throw err;
    }
};

// User location weather
export const userLocationWeather = async function() {
    try {
        const city = await userLocationCity();
        const weatherData = await locationWeather(city);

        state.userLocationWeather = createDataObject(weatherData);

        const cInfo = await countryInfo(state.userLocationWeather.country);
        state.userLocationWeather.flag = cInfo.flags.png;
        state.userLocationWeather.country = cInfo.alpha2Code;

    } catch (err) {
        throw err;
    }
}

// Search location weather
export const searchLocationWeather = async function(query) {
    try {
        const data = await locationWeather(query);
        state.searchLocationWeather = createDataObject(data);

        const cInfo = await countryInfo(state.searchLocationWeather.country);
        state.searchLocationWeather.flag = cInfo.flags.png;
        state.searchLocationWeather.country = cInfo.alpha2Code;

    } catch (err) {
        throw err;
    }
}


// Country info
const countryInfo = async function(country) {
    try {
        const data = await getJson(`${COUNTRIES_INFO_API}${country}`);
        return data[0];
    } catch (err) {
        throw err;
    }
}