import Constants from "expo-constants";

const WM_API_KEY = Constants.manifest.extra.weatherMapApiKey;
const BASE_URL = "http://api.openweathermap.org/data/2.5/onecall/timemachine";

const getWeather = async (lat, lon, time) => {
  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&dt=${time}&units=metric&appid=${WM_API_KEY}`
  );

  const data = await res.json();
  return data;
};

const WeatherMapApi = {
  getWeather,
};

export default WeatherMapApi;
