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
const ApiKey = "90b1153e7229ea734ad261381557d7c0";
let weatherData;
let searchedCity = "";
let isFilled = false;
function updateCityInput(input) {
  searchedCity = input.value;
}
const barRef = document.querySelector(".bar");
const inputRef1 = document.querySelector("#inputField1");
const inputRef2 = document.querySelector("#inputField2");
const menuArticle = document.querySelector(".weather-article");
const searchRefWhite = document.querySelector(".magnifying-glass-white");
const searchRefBlack = document.querySelector(".magnifying-glass-black");
inputRef1 === null || inputRef1 === void 0
  ? void 0
  : inputRef1.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2 === null || inputRef2 === void 0
  ? void 0
  : inputRef2.addEventListener("input", () => updateCityInput(inputRef2));
inputRef2.addEventListener("change", (e) => fetchWeather(e));
inputRef1.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    hideElements();
    fetchWeather(e);
    inputRef1.classList.add("hide");
    searchRefBlack === null || searchRefBlack === void 0
      ? void 0
      : searchRefBlack.classList.add("hide");
    searchRefWhite.classList.remove("hide");
    inputRef1.value = "";
  }
});
inputRef2.addEventListener("keypress", (e) => {
  var _a;
  if (e.key === "Enter") {
    hideElements();
    fetchWeather(e);
    (_a = document.querySelector(".display-weather-container")) === null || _a === void 0
      ? void 0
      : _a.classList.remove("hide");
    inputRef2.value = "";
  }
});
barRef.addEventListener("click", () => {});
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
      var _a;
      hideElements();
      searchRefWhite.classList.add("hide");
      inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.remove("hide");
      searchRefBlack === null || searchRefBlack === void 0
        ? void 0
        : searchRefBlack.classList.remove("hide");
      (_a = document.querySelector(".display-weather-container")) === null || _a === void 0
        ? void 0
        : _a.classList.remove("hide");
    });
searchRefBlack === null || searchRefBlack === void 0
  ? void 0
  : searchRefBlack.addEventListener("click", () => {
      var _a, _b, _c, _d, _e;
      inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.add("hide");
      searchRefBlack === null || searchRefBlack === void 0
        ? void 0
        : searchRefBlack.classList.add("hide");
      (_a = document.querySelector(".display-weather-container")) === null || _a === void 0
        ? void 0
        : _a.classList.add("hide");
      inputRef2.textContent = "";
      (_b = document.querySelector(".weather-logo")) === null || _b === void 0
        ? void 0
        : _b.classList.remove("hide");
      (_c = document.querySelector(".weather-slogan")) === null || _c === void 0
        ? void 0
        : _c.classList.remove("hide");
      (_d = document.querySelector(".weather-heading")) === null || _d === void 0
        ? void 0
        : _d.classList.remove("hide");
      (_e = document.querySelector("#inputField2")) === null || _e === void 0
        ? void 0
        : _e.classList.remove("hide");
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
const tempContainerRef = document.querySelector(".temp-container");
tempContainerRef.classList.add("hide");
displayDataInMenu();
function displayWeatherData() {
  var _a, _b;
  tempContainerRef.classList.remove("hide");
  (_a = document.querySelector(".wind-image")) === null || _a === void 0
    ? void 0
    : _a.classList.remove("hide");
  (_b = document.querySelector(".humidity-image")) === null || _b === void 0
    ? void 0
    : _b.classList.remove("hide");
  const searchedLocation = document.querySelector(".weather-location-name");
  const displayNameRef = document.querySelector(".display-weather__name");
  const displayTempRef = document.querySelector(".display-weather__temp");
  const displayHumidityRef = document.querySelector(".display-weather__humidity");
  const displayFeelsLikeRef = document.querySelector(".display-weather__feels-like");
  const displayWindSpeedRef = document.querySelector(".display-weather__wind-speed");
  const divWrapper = document.querySelector(".display-weather-wrapper__name-and-star");
  const humidityImg = document.querySelector(".humidity-image");
  if (
    !displayNameRef ||
    !displayTempRef ||
    !displayHumidityRef ||
    !displayFeelsLikeRef ||
    !displayWindSpeedRef ||
    !divWrapper ||
    !humidityImg
  ) {
    console.log("Något är fel med datan");
    return;
  }
  const starExist = divWrapper.querySelector(".star");
  if (starExist) {
    starExist.remove();
  }
  if (!searchedCity) {
    searchedLocation.textContent = "Please enter a city name";
    return;
  }
  const savedFavorites = localStorage.getItem("savedWeatherData");
  const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
  const isFavorite = weatherArray.some((data) => data.name === weatherData.name);
  const starImg = makeStar(isFavorite, () => {
    toggleFavorite(weatherData);
    if (!isFavorite) {
      starImg.src = "../dist/assets/star.svg";
    } else {
      starImg.src = "../dist/assets/starFilled.svg";
      displayDataInMenu();
    }
  });
  if (!weatherData) {
    searchedLocation.textContent = `No result found for "${searchedCity}"`;
    return;
  } else {
    checkWeatherImage();
    const roundedTemp = Math.floor(weatherData.main.temp);
    const roundedFeelsLike = Math.floor(weatherData.main.feels_like);
    const roundedWindSpeed = Math.floor(weatherData.wind.speed);
    const starImg = document.createElement("img");
    starImg.src = "../dist/assets/star.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
    divWrapper.append(starImg);
    displayNameRef.textContent = weatherData.name;
    displayTempRef.textContent = `${roundedTemp}°C`;
    displayHumidityRef.textContent = `Humidity ${weatherData.main.humidity}%`;
    displayFeelsLikeRef.textContent = `Feels like ${roundedFeelsLike}°C`;
    displayWindSpeedRef.textContent = `Wind ${roundedWindSpeed} km/h`;
    starImg.addEventListener("click", () => {
      const savedWeatherData = localStorage.getItem("savedWeatherData");
      let weatherArray = savedWeatherData ? JSON.parse(savedWeatherData) : [];
      if (isFilled) {
        starImg.src = "../dist/assets/star.svg";
        weatherArray = weatherArray.filter((data) => data.name !== weatherData.name);
      } else {
        starImg.src = "../dist/assets/starFilled.svg";
        const isExisting = weatherArray.some((data) => data.name === weatherData.name);
        if (!isExisting) {
          weatherArray.push(weatherData);
        }
      }
      localStorage.setItem("savedWeatherData", JSON.stringify(weatherArray));
      isFilled = !isFilled;
      displayDataInMenu();
    });
  }
}
function updateBackground(iconCode) {
  const body = document.querySelector("body");
  if (iconCode.includes("n")) {
    body.style.backgroundImage =
      "linear-gradient(180deg, rgba(15, 32, 39, 1) 0%, rgba(32, 58, 67, 1) 50%, rgba(44, 83, 100, 1) 100%)";
  } else if (iconCode.includes("d")) {
    body.style.backgroundImage =
      "linear-gradient(180deg, rgba(68, 193, 255, 1) 50%, rgba(255, 255, 255, 1) 100%)";
  }
}
function checkWeatherImage() {
  const weatherImage = document.createElement("img");
  const tempContainer = document.querySelector(".temp-container");
  const weatherContainer = document.querySelector(".display-weather-container");
  const iconCode = weatherData.weather[0].icon;
  updateBackground(iconCode);
  weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherImage.alt = "Weather image";
  weatherImage.classList.add("weather-image");
  // weatherImage.src.includes("01d")
  if (iconCode === "01d") {
    weatherImage.style.filter = "drop-shadow(0 0 0.75rem crimson)";
  } else {
    weatherImage.style.filter = "none";
  }
  if (weatherContainer && tempContainer) {
    const existingImage = weatherContainer.querySelector(".weather-image");
    if (existingImage) {
      existingImage.remove();
    }
    weatherContainer.insertBefore(weatherImage, tempContainer);
  }
}
function updateStarIcon() {
  const divWrapper = document.querySelector(".display-weather-wrapper__name-and-star");
  const starImg = divWrapper.querySelector(".star");
  const savedFavorites = localStorage.getItem("savedWeatherData");
  const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
  const isFavorite = weatherArray.some((data) => data.name === weatherData.name);
  if (!weatherData || !starImg) {
    return;
  }
  if (isFavorite) {
    starImg.src = "../dist/assets/starFilled.svg";
  } else {
    starImg.src = "../dist/assets/star.svg";
  }
}
function makeStar(isFilled, onClick) {
  const starImg = document.createElement("img");
  if (isFilled) {
    starImg.src = "../dist/assets/starFilled.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
  } else {
    starImg.src = "../dist/assets/star.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
  }
  starImg.addEventListener("click", () => {
    onClick();
    if (isFilled) {
      starImg.src = "../dist/assets/star.svg";
    } else {
      starImg.src = "../dist/assets/starFilled.svg";
    }
    isFilled = !isFilled;
  });
  return starImg;
}
function displayDataInMenu() {
  menuArticle.innerHTML = "";
  const savedFavorites = localStorage.getItem("savedWeatherData");
  const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
  const menuHeading = document.querySelector(".menu-heading");
  if (weatherArray.length === 0) {
    menuHeading.textContent = "No favorites locations";
  } else {
    menuHeading.textContent = "Favorite weather locations";
    weatherArray.forEach((savedData) => {
      const locationDiv = document.createElement("div");
      locationDiv.classList.add("saved-location");
      const cityText = document.createElement("span");
      cityText.textContent = `${savedData.name}, ${Math.floor(
        savedData.main.temp
      )}°C, Wind speed ${Math.floor(savedData.wind.speed)} km/h`;
      locationDiv.appendChild(cityText);
      const starImg = makeStar(true, () => {
        toggleFavorite(savedData);
        displayDataInMenu();
      });
      locationDiv.appendChild(starImg);
      menuArticle.appendChild(locationDiv);
    });
  }
}
function toggleFavorite(cityData) {
  const savedFavorites = localStorage.getItem("savedWeatherData");
  let weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
  if (weatherArray.some((data) => data.name === cityData.name)) {
    weatherArray = weatherArray.filter((data) => data.name !== cityData.name);
  } else {
    weatherArray.push(cityData);
  }
  localStorage.setItem("savedWeatherData", JSON.stringify(weatherArray));
  updateStarIcon();
}
function fetchWeather(e) {
  return __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    hideElements();
    const searchedCityText = document.querySelector(".weather-location-name");
    if (!searchedCity) {
      searchedCityText.textContent = "Please enter a city name";
      return;
    }
    try {
      const savedFavorites = localStorage.getItem("savedWeatherData");
      const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
      const response = yield fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}&units=metric`
      );
      if (!response.ok) {
        searchedCityText.textContent = `Can't find "${searchedCity}"`;
        throw new Error("Det här fungerar ju verkligen inte");
      } else {
        searchedCityText.textContent = "";
        const data = yield response.json();
        weatherData = data;
        console.log(weatherData);
        if (weatherData) {
          displayWeatherData();
          displayDataInMenu();
          const isFavorite = weatherArray.some((data) => data.name === weatherData.name);
          const starImg = document.querySelector(".star");
          if (starImg) {
            starImg.src = isFavorite ? "../dist/assets/starFilled.svg" : "../dist/assets/star.svg";
          }
          updateStarIcon();
        } else {
          searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
        }
      }
    } catch (error) {
      console.error("Nu blev det fel!", error);
    }
  });
}
