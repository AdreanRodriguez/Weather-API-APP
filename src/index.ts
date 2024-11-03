import { WeatherData } from "./models/interfaces";

const ApiKey = "";
let weatherData: WeatherData;
let searchedCity: string;

const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
inputRef1.addEventListener("input", (): void => {
  searchedCity = inputRef1.value;
});

const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;
inputRef2.addEventListener("input", (): void => {
  searchedCity = inputRef2.value;
});

async function fetchWeather(): Promise<void> {
  if (!searchedCity) {
    console.log("Ingen stad är angiven.");
    return;
  }

  try {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`
    );
    if (!response.ok) {
      throw "Det här fungerar ju verkligen inte";
    } else {
      const data = await response.json();
      weatherData = data;
      displayWeatherData();
      return data;
    }
  } catch (error) {
    console.log("Nu blev det fel!", error);
  }
}

inputRef1.addEventListener("change", fetchWeather);
inputRef2.addEventListener("change", fetchWeather);

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

inputRef1.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    displayWeatherData();
  }
});

inputRef2.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    hideElements();
    displayWeatherData();
  }
});

// Skriv ut väder data här....
function displayWeatherData(): void {
  if (!weatherData) {
    console.log("Ingen väderdata är tillgänglig just nu.");
  } else {
    const searchedLocation = document.querySelector(".weather-location-name");
    if (searchedLocation) {
      console.log("HÄR ÄR", weatherData.name);
      searchedLocation.textContent = weatherData.name;
    } else if (searchedLocation === null) {
      return;
    }
    console.log("Tillgång till väderdata:", weatherData);
  }
}

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
