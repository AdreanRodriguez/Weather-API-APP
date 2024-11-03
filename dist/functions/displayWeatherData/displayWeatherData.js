"use strict";
// import { WeatherData } from "../../models/interfaces";
// let weatherData: WeatherData;
// let searchedCity: string = "";
// const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
// const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;
// if (!inputRef1) {
//   console.log("inputRef1 not found in DOM.");
// }
// if (!inputRef2) {
//   console.log("inputRef2 not found in DOM.");
// }
// // Funktion för att uppdatera searchedCity
// function updateCityInput(input: HTMLInputElement): void {
//   searchedCity = input.value;
//   console.log("Searched city updated:", searchedCity);
// }
// // Lägg till `input`-lyssnare för att uppdatera `searchedCity` vid textinmatning
// inputRef1?.addEventListener("input", () => updateCityInput(inputRef1));
// inputRef2?.addEventListener("input", () => updateCityInput(inputRef2));
// function displayWeatherData(): void {
//   const searchedLocation = document.querySelector(".weather-location-name") as HTMLParagraphElement;
//   if (!searchedCity) {
//     searchedLocation.textContent = "Please enter a city name";
//     console.log("Inget sökord angivet.");
//     return;
//   }
//   if (!weatherData) {
//     searchedLocation.textContent = `No result found for "${searchedCity}"`;
//     console.log("Ingen väderdata är tillgänglig just nu.");
//     return;
//   }
//   // Om allt är korrekt, visa väderdata
//   searchedLocation.textContent = `${weatherData.name}: ${weatherData.main.temp}°C`;
//   console.log("Tillgång till väderdata:", weatherData);
// }
// export { displayWeatherData };
