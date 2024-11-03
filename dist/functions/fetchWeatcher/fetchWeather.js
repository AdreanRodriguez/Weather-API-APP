"use strict";
// import { WeatherData } from "models/interfaces";
// import { displayWeatherData } from "../displayWeatherData/displayWeatherData";
// import { weatherDataHandler } from "../weatherDataHandler/weatherDataHandler";
// const ApiKey: string = "90b1153e7229ea734ad261381557d7c0";
// let weatherData: WeatherData | null;
// let searchedCity: string = "";
// async function fetchWeather(): Promise<void> {
//   console.log("fetchWeather called");
//   // e.preventDefault();
//   const searchedCityText = document.querySelector(".weather-location-name") as HTMLParagraphElement;
//   if (!searchedCity) {
//     searchedCityText.textContent = "Please enter a city name";
//     console.log("Inget sökord angivet");
//     return;
//   }
//   try {
//     console.log("Fetching weather data for:", searchedCity);
//     const response: Response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`
//     );
//     if (!response.ok) {
//       searchedCityText.textContent = `Can't find "${searchedCity}"`;
//       console.log("API response not OK:", response.status, response.statusText);
//       throw new Error("Det här fungerar ju verkligen inte");
//     } else {
//       const data = await response.json();
//       console.log("Raw data from API: ", data);
//       weatherData = weatherDataHandler(data);
//       if (weatherData) {
//         console.log("Processed weatherData:", weatherData);
//         displayWeatherData();
//       } else {
//         searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
//         console.log("weatherDataHandler returned null or undefined");
//       }
//     }
//   } catch (error) {
//     console.log("Nu blev det fel!", error);
//   }
// }
// export { fetchWeather };
