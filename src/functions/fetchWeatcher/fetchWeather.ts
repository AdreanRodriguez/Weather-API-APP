import { displayWeatherData } from "../displayWeatherData/displayWeatherData";
import { weatherDataHandler } from "../weatherDataHandler/weatherDataHandler";

const ApiKey: string = "";
let searchedCity: string = "";

async function fetchWeather(e: Event): Promise<void> {
  e.preventDefault();
  const searchedCityText = document.querySelector(".weather-location-name") as HTMLParagraphElement;
  if (!searchedCity) {
    searchedCityText.textContent = "Please enter a city name";
    return;
  } else {
    searchedCityText.textContent = `Can't find "${searchedCity}"`;
  }

  try {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`
    );
    if (!response.ok) {
      throw "Det här fungerar ju verkligen inte";
    } else {
      const data = await response.json();
      weatherDataHandler(data);
      displayWeatherData(e);
      return data;
    }
  } catch (error) {
    console.log("Nu blev det fel!", error);
  }
}

export { fetchWeather };
