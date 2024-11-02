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
let searchedCity;
const inputRef1 = document.querySelector("#inputField1");
inputRef1.addEventListener("input", () => {
    searchedCity = inputRef1.value;
    console.log("Skriver i inputfält 1:", searchedCity);
});
const inputRef2 = document.querySelector("#inputField2");
inputRef2.addEventListener("input", () => {
    searchedCity = inputRef2.value;
    console.log("Skriver i inputfält 2:", searchedCity);
});
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchedCity) {
            console.log("Ingen stad är angiven.");
            return;
        }
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}`);
            if (!response.ok) {
                throw "Det här fungerar ju verkligen inte";
            }
            else {
                const data = yield response.json();
                console.log(data);
                weatherData = data;
                return data;
            }
        }
        catch (error) {
            console.log("Nu blev det fel!", error);
        }
    });
}
inputRef1.addEventListener("change", fetchWeather);
inputRef2.addEventListener("change", fetchWeather);
const barRef = document.querySelector(".bar");
barRef.addEventListener("click", () => {
    console.log("baren är klickad");
});
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
// inputRef1.addEventListener("keypress", (e): void => {
//   if (e.key === "Enter") {
//   }
// });
inputRef2.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        hideElements();
    }
});
// Skriv ut väder data här....
function displayWeatherInfo() {
    if (!weatherData) {
        console.log("Ingen väderdata är tillgänglig just nu.");
    }
    else {
        console.log("Tillgång till väderdata:", weatherData);
        // Du kan också uppdatera fler element på sidan baserat på weatherData
    }
}
