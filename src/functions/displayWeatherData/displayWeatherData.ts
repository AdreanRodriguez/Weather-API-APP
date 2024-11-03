import { WeatherData } from "../../models/interfaces";
let weatherData: WeatherData;

// const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
// const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;
let searchedCity: string = "";

const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
inputRef1.addEventListener("input", (e: Event): void => {
  e.preventDefault();
  searchedCity = inputRef1.value;
  console.log("Searched city updated from inputRef1:", searchedCity);
});

const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;
inputRef2.addEventListener("input", (e: Event): void => {
  e.preventDefault();
  searchedCity = inputRef2.value;
  console.log("Searched city updated from inputRef2:", searchedCity);
});

function displayWeatherData(e: Event): void {
  e.preventDefault();
  const searchedLocation = document.querySelector(".weather-location-name") as HTMLParagraphElement;

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

  // Om allt är korrekt, visa väderdata
  searchedLocation.textContent = weatherData.name;
  console.log("Tillgång till väderdata:", weatherData);
}

export { displayWeatherData };
