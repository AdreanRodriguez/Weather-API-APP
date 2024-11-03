var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { displayWeatherData } from "../displayWeatherData/displayWeatherData.js";
import { weatherDataHandler } from "../weatherDataHandler/weatherDataHandler.js";
const ApiKey = "90b1153e7229ea734ad261381557d7c0";
let searchedCity;
const inputRef1 = document.querySelector("#inputField1");
inputRef1.addEventListener("input", () => {
  searchedCity = inputRef1.value;
});
const inputRef2 = document.querySelector("#inputField2");
inputRef2.addEventListener("input", () => {
  searchedCity = inputRef2.value;
});
function fetchWeather(e) {
  return __awaiter(this, void 0, void 0, function* () {
    const searchedCityText = document.querySelector(".weather-location-name");
    if (searchedCity) {
      searchedCityText.textContent = `Can't find "${searchedCity}"`;
    }
    try {
      const response = yield fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`
      );
      if (!response.ok) {
        throw "Det här fungerar ju verkligen inte";
      } else {
        const data = yield response.json();
        weatherDataHandler(data);
        displayWeatherData(e);
        return data;
      }
    } catch (error) {
      console.log("Nu blev det fel!", error);
    }
  });
}
export { fetchWeather };
