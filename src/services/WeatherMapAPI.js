const weatherApiKey = "73e13ac621a4eda984ea57f772d5161d";
const BASE_URL = "http://api.openweathermap.org/data/2.5/onecall/timemachine";

const getWeather = async (lat, lon, time) => {
  const res = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&dt=${time}&units=metric&appid=${weatherApiKey}`
  );

  const data = await res.json();
  return data;
};

const WeatherMapApi = {
  getWeather,
};

export default WeatherMapApi;
