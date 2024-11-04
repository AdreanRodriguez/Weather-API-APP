// Glöm inte lägga in i interfaces
interface WeatherData {
  main: Main;
  wind: Wind;
  name: string;
  weather: Weather[];
}

interface Main {
  temp: number;
  humidity: number;
  feels_like: number;
}

interface Weather {
  main: string;
  description: string;
}

interface Wind {
  deg: number;
  speed: number;
}

const ApiKey: string = "90b1153e7229ea734ad261381557d7c0";
let weatherData: WeatherData;
let searchedCity: string = "";

// Funktion för att uppdatera searchedCity
function updateCityInput(input: HTMLInputElement): void {
  searchedCity = input.value;
}

const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;

inputRef1?.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2?.addEventListener("input", () => updateCityInput(inputRef2));

inputRef2.addEventListener("change", (e) => fetchWeather(e));

inputRef1.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    hideElements();
    fetchWeather(e);
    inputRef1.classList.add("hide");
    searchRefBlack?.classList.add("hide");
    searchRefWhite.classList.remove("hide");
  }
});

inputRef2.addEventListener("keypress", (e): void => {
  if (e.key === "Enter") {
    hideElements();
    fetchWeather(e);
  }
});

const barRef = document.querySelector(".bar") as HTMLDivElement;
barRef.addEventListener("click", (): void => {});

const searchRefWhite = document.querySelector(".magnifying-glass-white") as HTMLImageElement;
const searchRefBlack = document.querySelector(".magnifying-glass-black") as HTMLImageElement;

function hideElements(): void {
  document.querySelector(".weather-logo")?.classList.add("hide");
  document.querySelector(".weather-heading")?.classList.add("hide");
  document.querySelector(".weather-slogan")?.classList.add("hide");
  document.querySelector("#inputField2")?.classList.add("hide");
}

searchRefWhite?.addEventListener("click", (): void => {
  hideElements();
  searchRefBlack?.classList.remove("hide");
  inputRef1?.classList.remove("hide");
  searchRefWhite.classList.add("hide");
});

searchRefBlack?.addEventListener("click", (): void => {
  searchRefBlack?.classList.add("hide");
  inputRef1?.classList.add("hide");
  document.querySelector(".weather-logo")?.classList.remove("hide");
  document.querySelector(".weather-heading")?.classList.remove("hide");
  document.querySelector(".weather-slogan")?.classList.remove("hide");
  document.querySelector("#inputField2")?.classList.remove("hide");
  searchRefWhite.classList.remove("hide");
});

const closeMenu = document.querySelector(".menu-close") as HTMLParagraphElement;
closeMenu?.addEventListener("click", (): void => {
  openMenu.style.height = "20px";
  document.querySelector(".menu-section")?.classList.add("hide-menu");
});

const openMenu = document.querySelector(".bar") as HTMLElement;
openMenu?.addEventListener("click", (): void => {
  openMenu.style.height = "10px";
  document.querySelector(".menu-section")?.classList.remove("hide-menu");
  document.querySelector(".menu-section")?.classList.add("show-menu");
});

function displayWeatherData(): void {
  const searchedLocation = document.querySelector(".weather-location-name") as HTMLParagraphElement;
  const displayNameRef = document.querySelector(".display-weather__name") as HTMLElement;
  const displayTempRef = document.querySelector(".display-weather__temp") as HTMLElement;
  const displayHumidityRef = document.querySelector(
    ".display-weather__humidity"
  ) as HTMLParagraphElement;
  const displayFeelsLikeRef = document.querySelector(
    ".display-weather__feels-like"
  ) as HTMLParagraphElement;
  const displayDescriptionRef = document.querySelector(
    ".display-weather__description"
  ) as HTMLParagraphElement;
  const displayWindSpeedRef = document.querySelector(
    ".display-weather__wind-speed"
  ) as HTMLParagraphElement;
  const divWrapper = document.querySelector(
    ".display-weather-wrapper__name-and-star"
  ) as HTMLDivElement;
  if (
    !displayNameRef ||
    !displayTempRef ||
    !displayHumidityRef ||
    !displayFeelsLikeRef ||
    !displayDescriptionRef ||
    !displayWindSpeedRef ||
    !divWrapper
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
    console.log("Inget sökord angivet.");
    return;
  }

  const savedFavorites = localStorage.getItem("savedWeatherData");
  const weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];
  const isFavorite = weatherArray.some((data) => data.name === weatherData.name);

  // Skapa stjärn-ikonen med `makeStar`
  const starImg: HTMLImageElement = makeStar(isFavorite, () => {
    toggleFavorite(weatherData);
    // Uppdatera `isFilled` baserat på om staden är favorit
    starImg.src = isFavorite ? "../dist/assets/star.svg" : "../dist/assets/starFilled.svg";
    displayDataInMenu(); // Uppdatera menyn
  });

  if (!weatherData) {
    searchedLocation.textContent = `No result found for "${searchedCity}"`;
    console.log("Ingen väderdata är tillgänglig just nu.");
    return;
  } else {
    const roundedTemp = Math.floor(weatherData.main.temp);
    const roundedFeelsLike = Math.floor(weatherData.main.feels_like);
    const roundedWindSpeed = Math.floor(weatherData.wind.speed);

    const starImg = document.createElement("img") as HTMLImageElement;
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

    let isFilled: boolean = false;

    starImg.addEventListener("click", (): void => {
      const savedWeatherData = localStorage.getItem("savedWeatherData");
      let weatherArray: WeatherData[] = savedWeatherData ? JSON.parse(savedWeatherData) : [];

      if (isFilled) {
        starImg.src = "../dist/assets/star.svg";
        weatherArray = weatherArray.filter((data) => data.name !== weatherData.name);
      } else {
        starImg.src = "../dist/assets/starFilled.svg";
        const isExisting = weatherArray.some((data) => data.name === weatherData.name) as Boolean;
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

function makeStar(isFilled: boolean, onClick: () => void): HTMLImageElement {
  const starImg = document.createElement("img") as HTMLImageElement;
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

function displayDataInMenu(): void {
  const menuArticle = document.querySelector(".weather-article") as HTMLElement;
  menuArticle.innerHTML = ""; // Rensa menyn

  const savedFavorites: string | null = localStorage.getItem("savedWeatherData");
  const weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];

  weatherArray.forEach((savedData) => {
    const locationDiv = document.createElement("div");
    locationDiv.classList.add("saved-location");

    // Lägg till stadens namn
    const cityText = document.createElement("span");
    cityText.textContent = `${savedData.name}, ${Math.floor(savedData.main.temp)}°C, ${
      savedData.weather[0].description
    }`;
    locationDiv.appendChild(cityText);

    const starImg = makeStar(true, () => {
      toggleFavorite(savedData);
      displayDataInMenu();
    });

    locationDiv.appendChild(starImg);
    menuArticle.appendChild(locationDiv);
  });
}

function toggleFavorite(cityData: WeatherData): void {
  const savedFavorites: string | null = localStorage.getItem("savedWeatherData");
  let weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];

  // Om staden redan är favorit, ta bort den, annars lägg till den
  if (weatherArray.some((data) => data.name === cityData.name)) {
    weatherArray = weatherArray.filter((data) => data.name !== cityData.name);
  } else {
    weatherArray.push(cityData);
  }

  localStorage.setItem("savedWeatherData", JSON.stringify(weatherArray));
}

async function fetchWeather(e: Event): Promise<void> {
  e.preventDefault();
  const searchedCityText = document.querySelector(".weather-location-name") as HTMLParagraphElement;

  if (!searchedCity) {
    searchedCityText.textContent = "Please enter a city name";
    return;
  }

  try {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${ApiKey}&units=metric`
    );

    if (!response.ok) {
      searchedCityText.textContent = `Can't find "${searchedCity}"`;
      throw new Error("Det här fungerar ju verkligen inte");
    } else {
      searchedCityText.textContent = "";
      const data = await response.json();

      // weatherData = weatherDataHandler(data);
      weatherData = data;
      if (weatherData) {
        displayWeatherData();
      } else {
        searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
        console.log("weatherDataHandler returned null or undefined");
      }
    }
  } catch (error) {
    console.log("Nu blev det fel!", error);
  }
}
