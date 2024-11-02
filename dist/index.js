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
window.addEventListener("load", () => {
    fetchWeather();
});
function fetchWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=årjäng&appid=${ApiKey}`);
            if (!response.ok) {
                throw "Det här fungerar ju verkligen inte";
            }
            else {
                let data = yield response.json();
                console.log(data);
                return data;
            }
        }
        catch (error) {
            console.log("Nu blev det fel!", error);
        }
    });
}
const barRef = document.querySelector(".bar");
barRef.addEventListener("click", () => {
    console.log("baren är klickad");
});
const searchRefBlack = document.querySelector(".magnifying-glass-black");
const searchInputRef = document.querySelector(".search-input");
const searchRefWhite = document.querySelector(".magnifying-glass-white");
searchRefWhite === null || searchRefWhite === void 0 ? void 0 : searchRefWhite.addEventListener("click", () => {
    searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.classList.remove("hide");
    searchInputRef === null || searchInputRef === void 0 ? void 0 : searchInputRef.classList.remove("hide");
    searchRefWhite.classList.add("hide");
});
searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.addEventListener("click", () => {
    searchRefBlack === null || searchRefBlack === void 0 ? void 0 : searchRefBlack.classList.add("hide");
    searchInputRef === null || searchInputRef === void 0 ? void 0 : searchInputRef.classList.add("hide");
    searchRefWhite.classList.remove("hide");
});
