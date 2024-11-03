import { fetchWeather } from "./functions/fetchWeatcher/fetchWeather.js";
import { displayWeatherData } from "./functions/displayWeatherData/displayWeatherData.js";
const inputRef1 = document.querySelector("#inputField1");
const inputRef2 = document.querySelector("#inputField1");
inputRef1.addEventListener("change", (e) => fetchWeather(e));
inputRef2.addEventListener("change", (e) => fetchWeather(e));
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
inputRef1.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    displayWeatherData(e);
  }
});
inputRef2.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    hideElements();
    displayWeatherData(e);
  }
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
