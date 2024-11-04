"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ApiKey = "90b1153e7229ea734ad261381557d7c0";
let weatherData;
let searchedCity = "";
// Funktion för att uppdatera searchedCity
function updateCityInput(input) {
    searchedCity = input.value;
}
const inputRef1 = document.querySelector("#inputField1");
const inputRef2 = document.querySelector("#inputField2");
inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2 === null || inputRef2 === void 0 ? void 0 : inputRef2.addEventListener("input", () => updateCityInput(inputRef2));
inputRef2.addEventListener("change", (e) => fetchWeather(e));
inputRef1.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hideElements();
        fetchWeather(e);
        inputRef1.classList.add("hide");
        searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.classList.add("hide");
        searchRefWhite.classList.remove("hide");
    }
});
inputRef2.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hideElements();
        fetchWeather(e);
    }
});
const barRef = document.querySelector(".bar");
barRef.addEventListener("click", () => { });
const searchRefWhite = document.querySelector(".magnifying-glass-white");
const searchRefBlack = document.querySelector(".magnifying-glass-black");
function hideElements() {
    var _a, _b, _c, _d;
    (_a = document.querySelector(".weather-logo")) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
    (_b = document.querySelector(".weather-heading")) === null || _b === void 0 ? void 0 : _b.classList.add("hide");
    (_c = document.querySelector(".weather-slogan")) === null || _c === void 0 ? void 0 : _c.classList.add("hide");
    (_d = document.querySelector("#inputField2")) === null || _d === void 0 ? void 0 : _d.classList.add("hide");
}
searchRefWhite === null || searchRefWhite === void 0 ? void 0 : searchRefWhite.addEventListener("click", () => {
    hideElements();
    searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.classList.remove("hide");
    inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.remove("hide");
    searchRefWhite.classList.add("hide");
});
searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.addEventListener("click", () => {
    var _a, _b, _c, _d;
    searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.classList.add("hide");
    inputRef1 === null || inputRef1 === void 0 ? void 0 : inputRef1.classList.add("hide");
    (_a = document.querySelector(".weather-logo")) === null || _a === void 0 ? void 0 : _a.classList.remove("hide");
    (_b = document.querySelector(".weather-heading")) === null || _b === void 0 ? void 0 : _b.classList.remove("hide");
    (_c = document.querySelector(".weather-slogan")) === null || _c === void 0 ? void 0 : _c.classList.remove("hide");
    (_d = document.querySelector("#inputField2")) === null || _d === void 0 ? void 0 : _d.classList.remove("hide");
    searchRefWhite.classList.remove("hide");
});
const closeMenu = document.querySelector(".menu-close");
closeMenu === null || closeMenu === void 0 ? void 0 : closeMenu.addEventListener("click", () => {
    var _a;
    openMenu.style.height = "20px";
    (_a = document.querySelector(".menu-section")) === null || _a === void 0 ? void 0 : _a.classList.add("hide-menu");
});
const openMenu = document.querySelector(".bar");
openMenu === null || openMenu === void 0 ? void 0 : openMenu.addEventListener("click", () => {
    var _a, _b;
    openMenu.style.height = "10px";
    (_a = document.querySelector(".menu-section")) === null || _a === void 0 ? void 0 : _a.classList.remove("hide-menu");
    (_b = document.querySelector(".menu-section")) === null || _b === void 0 ? void 0 : _b.classList.add("show-menu");
});
function displayWeatherData() {
    const searchedLocation = document.querySelector(".weather-location-name");
    const displayNameRef = document.querySelector(".display-weather__name");
    const displayTempRef = document.querySelector(".display-weather__temp");
    const displayHumidityRef = document.querySelector(".display-weather__humidity");
    const displayFeelsLikeRef = document.querySelector(".display-weather__feels-like");
    const displayDescriptionRef = document.querySelector(".display-weather__description");
    const displayWindSpeedRef = document.querySelector(".display-weather__wind-speed");
    const divWrapper = document.querySelector(".display-weather-wrapper__name-and-star");
    if (!displayNameRef ||
        !displayTempRef ||
        !displayHumidityRef ||
        !displayFeelsLikeRef ||
        !displayDescriptionRef ||
        !displayWindSpeedRef ||
        !divWrapper) {
        console.log("Något är fel med datan");
        return;
    }
    const starExist = divWrapper.querySelector(".star");
    if (starExist) {
        starExist.remove();
    }
    if (!searchedCity) {
        searchedLocation.textContent = "Please enter a city name";
        console.log("Inget sökord angivet.");
        return;
    }
    const savedFavorites = localStorage.getItem("savedWeatherData");
    const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
    const isFavorite = weatherArray.some((data) => data.name === weatherData.name);
    // Skapa stjärn-ikonen med `makeStar`
    const starImg = makeStar(isFavorite, () => {
        toggleFavorite(weatherData);
        // Uppdatera `isFilled` baserat på om staden är favorit
        starImg.src = isFavorite ? "../dist/assets/star.svg" : "../dist/assets/starFilled.svg";
        displayDataInMenu(); // Uppdatera menyn
    });
    if (!weatherData) {
        searchedLocation.textContent = `No result found for "${searchedCity}"`;
        console.log("Ingen väderdata är tillgänglig just nu.");
        return;
    }
    else {
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
        displayDescriptionRef.textContent = `${weatherData.weather[0].description}`;
        displayWindSpeedRef.textContent = `Wind speed ${roundedWindSpeed} km/h`;
        let isFilled = false;
        starImg.addEventListener("click", () => {
            const savedWeatherData = localStorage.getItem("savedWeatherData");
            let weatherArray = savedWeatherData ? JSON.parse(savedWeatherData) : [];
            if (isFilled) {
                starImg.src = "../dist/assets/star.svg";
                weatherArray = weatherArray.filter((data) => data.name !== weatherData.name);
            }
            else {
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
function makeStar(isFilled, onClick) {
    const starImg = document.createElement("img");
    starImg.src = isFilled ? "../dist/assets/starFilled.svg" : "../dist/assets/star.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
    starImg.addEventListener("click", () => {
        onClick();
        starImg.src = starImg.src.includes("starFilled.svg")
            ? "../dist/assets/star.svg"
            : "../dist/assets/starFilled.svg";
    });
    return starImg;
}
function displayDataInMenu() {
    const menuArticle = document.querySelector(".weather-article");
    menuArticle.innerHTML = ""; // Rensa menyn
    const savedFavorites = localStorage.getItem("savedWeatherData");
    const weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
    weatherArray.forEach((savedData) => {
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("saved-location");
        // Lägg till stadens namn
        const cityText = document.createElement("span");
        cityText.textContent = `${savedData.name}, ${Math.floor(savedData.main.temp)}°C, ${savedData.weather[0].description}`;
        locationDiv.appendChild(cityText);
        const starImg = makeStar(true, () => {
            toggleFavorite(savedData);
            displayDataInMenu();
        });
        locationDiv.appendChild(starImg);
        menuArticle.appendChild(locationDiv);
    });
}
function toggleFavorite(cityData) {
    const savedFavorites = localStorage.getItem("savedWeatherData");
    let weatherArray = savedFavorites ? JSON.parse(savedFavorites) : [];
    // Om staden redan är favorit, ta bort den, annars lägg till den
    if (weatherArray.some((data) => data.name === cityData.name)) {
        weatherArray = weatherArray.filter((data) => data.name !== cityData.name);
    }
    else {
        weatherArray.push(cityData);
    }
    localStorage.setItem("savedWeatherData", JSON.stringify(weatherArray));
}
function fetchWeather(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const searchedCityText = document.querySelector(".weather-location-name");
        if (!searchedCity) {
            searchedCityText.textContent = "Please enter a city name";
            return;
        }
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}&units=metric`);
            if (!response.ok) {
                searchedCityText.textContent = `Can't find "${searchedCity}"`;
                throw new Error("Det här fungerar ju verkligen inte");
            }
            else {
                searchedCityText.textContent = "";
                const data = yield response.json();
                // weatherData = weatherDataHandler(data);
                weatherData = data;
                if (weatherData) {
                    displayWeatherData();
                }
                else {
                    searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
                    console.log("weatherDataHandler returned null or undefined");
                }
            }
        }
        catch (error) {
            console.log("Nu blev det fel!", error);
        }
    });
}
