import { WeatherData } from "models/interfaces";

const ApiKey: string = "90b1153e7229ea734ad261381557d7c0";
let weatherData: WeatherData | null;
let searchedCity: string = "";

// Funktion för att uppdatera searchedCity
function updateCityInput(input: HTMLInputElement): void {
  searchedCity = input.value;
  console.log("Searched city updated:", searchedCity);
}
const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;

// Lägg till `input`-lyssnare för att uppdatera `searchedCity` vid textinmatning
inputRef1?.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2?.addEventListener("input", () => updateCityInput(inputRef2));

inputRef2.addEventListener("change", (e) => fetchWeather(e));

inputRef1.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    fetchWeather(e);
    displayWeatherData();
  }
});

inputRef2.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    hideElements();
    fetchWeather(e);
    displayWeatherData();
  }
});

const barRef = document.querySelector(".bar") as HTMLDivElement;
barRef.addEventListener("click", (): void => {});

const searchRefWhite = document.querySelector(".magnifying-glass-white") as HTMLImageElement;
const searchRefBlack = document.querySelector(".magnifying-glass-black") as HTMLImageElement;

function hideElements(): void {
  document.querySelector(".weather-logo")?.classList.add("hide");
  document.querySelector(".weather-heading")?.classList.add("hide");
  document.querySelector(".weather-slogan")?.classList.add("hide");
  document.querySelector("#inputField2")?.classList.add("hide");
}

searchRefWhite?.addEventListener("click", (): void => {
  hideElements();
  searchRefBlack?.classList.remove("hide");
  inputRef1?.classList.remove("hide");
  searchRefWhite.classList.add("hide");
});

searchRefBlack?.addEventListener("click", (): void => {
  searchRefBlack?.classList.add("hide");
  inputRef1?.classList.add("hide");
  document.querySelector(".weather-logo")?.classList.remove("hide");
  document.querySelector(".weather-heading")?.classList.remove("hide");
  document.querySelector(".weather-slogan")?.classList.remove("hide");
  document.querySelector("#inputField2")?.classList.remove("hide");
  searchRefWhite.classList.remove("hide");
});

const closeMenu = document.querySelector(".menu-close") as HTMLParagraphElement;
closeMenu?.addEventListener("click", (): void => {
  openMenu.style.height = "20px";
  document.querySelector(".menu-section")?.classList.add("hide-menu");
});

const openMenu = document.querySelector(".bar") as HTMLElement;
openMenu?.addEventListener("click", (): void => {
  openMenu.style.height = "10px";
  document.querySelector(".menu-section")?.classList.remove("hide-menu");
  document.querySelector(".menu-section")?.classList.add("show-menu");
});

function weatherDataHandler(data: WeatherData): WeatherData | null {
  if (!data) {
    console.log("NO DATA FOUND!!");
    return null; // Returnera `null` om datan saknas
  }
  // Lägg till eventuell bearbetning eller validering av `data` här
  console.log("DATA FOUND!!", data);
  // Returnera bearbetad eller validerad `WeatherData`
  return data;
}

function displayWeatherData(): void {
  const searchedLocation = document.querySelector(".weather-location-name") as HTMLParagraphElement;
  const displayNameRef = document.querySelector(".display-weather__name") as HTMLElement;
  const displayTempRef = document.querySelector(".display-weather__temp") as HTMLElement;
  const displayHumidityRef = document.querySelector(
    ".display-weather__humidity"
  ) as HTMLParagraphElement;
  const displayFeelsLikeRef = document.querySelector(
    ".display-weather__feels-like"
  ) as HTMLParagraphElement;
  const displayDescriptionRef = document.querySelector(
    ".display-weather__description"
  ) as HTMLParagraphElement;
  const displayWindSpeedRef = document.querySelector(
    ".display-weather__wind-speed"
  ) as HTMLParagraphElement;

  if (
    !displayNameRef ||
    !displayTempRef ||
    !displayHumidityRef ||
    !displayFeelsLikeRef ||
    !displayDescriptionRef ||
    !displayWindSpeedRef
  ) {
    console.log("Något är fel med datan");
    return;
  }

  if (!searchedCity) {
    searchedLocation.textContent = "Please enter a city name";
    console.log("Inget sökord angivet.");
    return;
  }

  if (!weatherData) {
    searchedLocation.textContent = `No result found for "${searchedCity}"`;
    console.log("Ingen väderdata är tillgänglig just nu.");
    return;
  }
  const roundedTemp = Math.floor(weatherData.main.temp);
  const roundedFeelsLike = Math.floor(weatherData.main.feels_like);
  const roundedWindSpeed = Math.floor(weatherData.wind.speed);

  // Om allt är korrekt, visa väderdata
  // searchedLocation.textContent = `${weatherData.name}: ${weatherData.main.temp}°C`;
  displayNameRef.textContent = weatherData.name;
  displayTempRef.textContent = `${roundedTemp}°C`;
  displayHumidityRef.textContent = `Humidity ${weatherData.main.humidity}%`;
  displayFeelsLikeRef.textContent = `Feels like ${roundedFeelsLike}°C`;
  displayDescriptionRef.textContent = `DESC ${weatherData.weather[0].description}`;
  displayWindSpeedRef.textContent = `Wind speed ${roundedWindSpeed} km/h`;
}

async function fetchWeather(e: Event): Promise<void> {
  e.preventDefault();
  const searchedCityText = document.querySelector(".weather-location-name") as HTMLParagraphElement;

  if (!searchedCity) {
    searchedCityText.textContent = "Please enter a city name";
    console.log("Inget sökord angivet");
    return;
  }

  try {
    console.log("Fetching weather data for:", searchedCity);
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}&units=metric`
    );

    if (!response.ok) {
      searchedCityText.textContent = `Can't find "${searchedCity}"`;
      console.log("API response not OK:", response.status, response.statusText);
      throw new Error("Det här fungerar ju verkligen inte");
    } else {
      const data = await response.json();
      console.log("Raw data from API: ", data);

      weatherData = weatherDataHandler(data);
      if (weatherData) {
        console.log("Processed weatherData:", weatherData);
        displayWeatherData();
      } else {
        searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
        console.log("weatherDataHandler returned null or undefined");
      }
    }
  } catch (error) {
    console.log("Nu blev det fel!", error);
  }
}
