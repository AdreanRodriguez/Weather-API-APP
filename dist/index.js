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
const inputRef1 = document.querySelector("#inputField1");
const inputRef2 = document.querySelector("#inputField2");
const ApiKey = "90b1153e7229ea734ad261381557d7c0";
let weatherData;
let searchedCity = "";
if (!inputRef1) {
  console.log("inputRef1 not found in DOM");
} else {
  console.log("inputRef1 found and event listener added for 'change' and 'keypress'");
  inputRef1.addEventListener("change", () => {
    console.log("inputRef1 change detected");
    fetchWeather();
  });
}
if (!inputRef2) {
  console.log("inputRef2 not found in DOM");
}
inputRef2.addEventListener("change", fetchWeather);
inputRef1.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchWeather();
    displayWeatherData();
  }
});
inputRef2.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    hideElements();
    fetchWeather();
    displayWeatherData();
  }
});
const barRef = document.querySelector(".bar");
barRef.addEventListener("click", () => {});
const searchRefWhite = document.querySelector(".magnifying-glass-white");
const searchRefBlack = document.querySelector(".magnifying-glass-black");
function hideElements() {
  var _a, _b, _c, _d;
  (_a = document.querySelector(".weather-logo")) === null || _a === void 0
    ? void 0
    : _a.classList.add("hide");
  (_b = document.querySelector(".weather-heading")) === null || _b === void 0
    ? void 0
    : _b.classList.add("hide");
  (_c = document.querySelector(".weather-slogan")) === null || _c === void 0
    ? void 0
    : _c.classList.add("hide");
  (_d = document.querySelector("#inputField2")) === null || _d === void 0
    ? void 0
    : _d.classList.add("hide");
}
searchRefWhite === null || searchRefWhite === void 0
  ? void 0
  : searchRefWhite.addEventListener("click", () => {
      hideElements();
      searchRefBlack === null || searchRefBlack === void 0
        ? void 0
        : searchRefBlack.classList.remove("hide");
      inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.remove("hide");
      searchRefWhite.classList.add("hide");
    });
searchRefBlack === null || searchRefBlack === void 0
  ? void 0
  : searchRefBlack.addEventListener("click", () => {
      var _a, _b, _c, _d;
      searchRefBlack === null || searchRefBlack === void 0
        ? void 0
        : searchRefBlack.classList.add("hide");
      inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.add("hide");
      (_a = document.querySelector(".weather-logo")) === null || _a === void 0
        ? void 0
        : _a.classList.remove("hide");
      (_b = document.querySelector(".weather-heading")) === null || _b === void 0
        ? void 0
        : _b.classList.remove("hide");
      (_c = document.querySelector(".weather-slogan")) === null || _c === void 0
        ? void 0
        : _c.classList.remove("hide");
      (_d = document.querySelector("#inputField2")) === null || _d === void 0
        ? void 0
        : _d.classList.remove("hide");
      searchRefWhite.classList.remove("hide");
    });
const closeMenu = document.querySelector(".menu-close");
closeMenu === null || closeMenu === void 0
  ? void 0
  : closeMenu.addEventListener("click", () => {
      var _a;
      openMenu.style.height = "20px";
      (_a = document.querySelector(".menu-section")) === null || _a === void 0
        ? void 0
        : _a.classList.add("hide-menu");
    });
const openMenu = document.querySelector(".bar");
openMenu === null || openMenu === void 0
  ? void 0
  : openMenu.addEventListener("click", () => {
      var _a, _b;
      openMenu.style.height = "10px";
      (_a = document.querySelector(".menu-section")) === null || _a === void 0
        ? void 0
        : _a.classList.remove("hide-menu");
      (_b = document.querySelector(".menu-section")) === null || _b === void 0
        ? void 0
        : _b.classList.add("show-menu");
    });
function weatherDataHandler(data) {
  if (!data) {
    console.log("NO DATA FOUND!!");
    return null; // Returnera `null` om datan saknas
  }
  // Lägg till eventuell bearbetning eller validering av `data` här
  console.log("DATA FOUND!!", data);
  // Returnera bearbetad eller validerad `WeatherData`
  return data;
}
function fetchWeather() {
  return __awaiter(this, void 0, void 0, function* () {
    console.log("fetchWeather called");
    // e.preventDefault();
    const searchedCityText = document.querySelector(".weather-location-name");
    if (!searchedCity) {
      searchedCityText.textContent = "Please enter a city name";
      console.log("Inget sökord angivet");
      return;
    }
    try {
      console.log("Fetching weather data for:", searchedCity);
      const response = yield fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`
      );
      if (!response.ok) {
        searchedCityText.textContent = `Can't find "${searchedCity}"`;
        console.log("API response not OK:", response.status, response.statusText);
        throw new Error("Det här fungerar ju verkligen inte");
      } else {
        const data = yield response.json();
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
  });
}
// Funktion för att uppdatera searchedCity
function updateCityInput(input) {
  searchedCity = input.value;
  console.log("Searched city updated:", searchedCity);
}
// Lägg till `input`-lyssnare för att uppdatera `searchedCity` vid textinmatning
inputRef1 === null || inputRef1 === void 0
  ? void 0
  : inputRef1.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2 === null || inputRef2 === void 0
  ? void 0
  : inputRef2.addEventListener("input", () => updateCityInput(inputRef2));
function displayWeatherData() {
  const searchedLocation = document.querySelector(".weather-location-name");
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
  searchedLocation.textContent = `${weatherData.name}: ${weatherData.main.temp}°C`;
  console.log("Tillgång till väderdata:", weatherData);
}
