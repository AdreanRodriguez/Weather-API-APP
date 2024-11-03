let weatherData;
const inputRef1 = document.querySelector("#inputField1");
let searchedCity;
function displayWeatherData(e) {
    e.preventDefault();
    const searchedLocation = document.querySelector(".weather-location-name");
    if (!weatherData) {
        searchedLocation.textContent = `No result for "${searchedCity}"`;
        console.log("Ingen väderdata är tillgänglig just nu.");
    }
    else if (searchedLocation === inputRef1) {
        // inputRef1.classList.add("hide");
        // searchRefBlack.classList.add("hide");
        searchedLocation.textContent = weatherData.name;
        console.log("Tillgång till väderdata:", weatherData);
    }
}
export { displayWeatherData };
