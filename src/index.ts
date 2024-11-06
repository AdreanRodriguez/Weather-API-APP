import { WeatherData } from "models/interfaces";

const ApiKey: string = "90b1153e7229ea734ad261381557d7c0";
let weatherData: WeatherData;
let searchedCity: string = "";
let isFilled: boolean = false;

function updateCityInput(input: HTMLInputElement): void {
  searchedCity = input.value;
}

const savedFavorites: string | null = localStorage.getItem("savedWeatherData");
const weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];
const isFavorite: boolean = weatherArray.some((data) => data.name === weatherData.name);

const inputRef1 = document.querySelector("#inputField1") as HTMLInputElement;
const inputRef2 = document.querySelector("#inputField2") as HTMLInputElement;
const searchRefWhite = document.querySelector(".magnifying-glass-white") as HTMLImageElement;
const searchRefBlack = document.querySelector(".magnifying-glass-black") as HTMLImageElement;

inputRef1?.addEventListener("input", () => updateCityInput(inputRef1));
inputRef2?.addEventListener("input", () => updateCityInput(inputRef2));

inputRef2.addEventListener("change", (e: Event) => fetchWeather(e));
inputRef1.addEventListener("keypress", (e: KeyboardEvent): void => {
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
    document.querySelector(".display-weather-container")?.classList.remove("hide");
  }
});

const barRef = document.querySelector(".bar") as HTMLDivElement;
barRef.addEventListener("click", (): void => {});

function hideElements(): void {
  document.querySelector(".weather-logo")?.classList.add("hide");
  document.querySelector(".weather-heading")?.classList.add("hide");
  document.querySelector(".weather-slogan")?.classList.add("hide");
  document.querySelector("#inputField2")?.classList.add("hide");
}

searchRefWhite?.addEventListener("click", (): void => {
  hideElements();
  searchRefWhite.classList.add("hide");

  inputRef1?.classList.remove("hide");
  searchRefBlack?.classList.remove("hide");
  document.querySelector(".display-weather-container")?.classList.remove("hide");
});

searchRefBlack?.addEventListener("click", (): void => {
  inputRef1?.classList.add("hide");
  searchRefBlack?.classList.add("hide");
  document.querySelector(".display-weather-container")?.classList.add("hide");
  inputRef2.innerHTML = "";

  document.querySelector(".weather-logo")?.classList.remove("hide");
  document.querySelector(".weather-slogan")?.classList.remove("hide");
  document.querySelector(".weather-heading")?.classList.remove("hide");
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

const tempContainerRef = document.querySelector(".temp-container") as HTMLElement;
tempContainerRef.classList.add("hide");

function displayWeatherData(): void {
  tempContainerRef.classList.remove("hide");
  document.querySelector(".wind-image")?.classList.remove("hide");
  document.querySelector(".humidity-image")?.classList.remove("hide");
  const searchedLocation = document.querySelector(".weather-location-name") as HTMLParagraphElement;
  const displayNameRef = document.querySelector(".display-weather__name") as HTMLElement;
  const displayTempRef = document.querySelector(".display-weather__temp") as HTMLElement;
  const displayHumidityRef = document.querySelector(
    ".display-weather__humidity"
  ) as HTMLParagraphElement;
  const displayFeelsLikeRef = document.querySelector(
    ".display-weather__feels-like"
  ) as HTMLParagraphElement;
  const displayWindSpeedRef = document.querySelector(
    ".display-weather__wind-speed"
  ) as HTMLParagraphElement;
  const divWrapper = document.querySelector(
    ".display-weather-wrapper__name-and-star"
  ) as HTMLDivElement;
  const humidityImg = document.querySelector(".humidity-image") as HTMLImageElement;
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

  const starImg: HTMLImageElement = makeStar(isFavorite, () => {
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
    const roundedTemp: number = Math.floor(weatherData.main.temp);
    const roundedFeelsLike: number = Math.floor(weatherData.main.feels_like);
    const roundedWindSpeed: number = Math.floor(weatherData.wind.speed);

    const starImg = document.createElement("img") as HTMLImageElement;
    starImg.src = "../dist/assets/star.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");

    // document.querySelector(".humidity-image")?.classList.remove("hide");
    // document.querySelector(".wind-image")?.classList.remove("hide");

    divWrapper.append(starImg);
    displayNameRef.textContent = weatherData.name;
    displayTempRef.textContent = `${roundedTemp}°C`;
    displayHumidityRef.textContent = `Humidity ${weatherData.main.humidity}%`;
    displayFeelsLikeRef.textContent = `Feels like ${roundedFeelsLike}°C`;
    displayWindSpeedRef.textContent = `Wind ${roundedWindSpeed} km/h`;

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

function updateBackground(iconCode: string): void {
  const body = document.querySelector("body") as HTMLElement;
  if (iconCode.includes("n")) {
    body.style.backgroundImage =
      "linear-gradient(180deg, rgba(15, 32, 39, 1) 0%, rgba(32, 58, 67, 1) 50%, rgba(44, 83, 100, 1) 100%)";
  } else if (iconCode.includes("d")) {
    body.style.backgroundImage =
      "linear-gradient(180deg, rgba(68, 193, 255, 1) 50%, rgba(255, 255, 255, 1) 100%)";
  }
}

function checkWeatherImage(): void {
  const weatherImage = document.createElement("img") as HTMLImageElement;
  const tempContainer = document.querySelector(".temp-container") as HTMLElement;
  const weatherContainer = document.querySelector(".display-weather-container") as HTMLElement;

  const iconCode: string = weatherData.weather[0].icon;

  updateBackground(iconCode);
  weatherImage.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherImage.alt = "Weather image";
  weatherImage.classList.add("weather-image");

  if (weatherContainer && tempContainer) {
    const existingImage = weatherContainer.querySelector(".weather-image");
    if (existingImage) {
      existingImage.remove();
    }
    weatherContainer.insertBefore(weatherImage, tempContainer);
  }
}

function updateStarIcon(): void {
  const divWrapper = document.querySelector(
    ".display-weather-wrapper__name-and-star"
  ) as HTMLDivElement;
  const starImg = divWrapper.querySelector(".star") as HTMLImageElement;

  if (!weatherData || !starImg) {
    return;
  }

  if (isFavorite) {
    starImg.src = "../dist/assets/starFilled.svg";
  } else {
    starImg.src = "../dist/assets/star.svg";
  }
}

function makeStar(isFilled: boolean, onClick: () => void): HTMLImageElement {
  const starImg = document.createElement("img") as HTMLImageElement;
  if (isFilled) {
    starImg.src = "../dist/assets/starFilled.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
  } else {
    starImg.src = "../dist/assets/star.svg";
    starImg.alt = "Star image";
    starImg.classList.add("star");
  }

  starImg.addEventListener("click", (): void => {
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

function displayDataInMenu(): void {
  const menuArticle = document.querySelector(".weather-article") as HTMLElement;
  menuArticle.innerHTML = "";

  const savedFavorites: string | null = localStorage.getItem("savedWeatherData");
  const weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];

  weatherArray.forEach((savedData) => {
    const locationDiv = document.createElement("div") as HTMLDivElement;
    locationDiv.classList.add("saved-location");

    const cityText = document.createElement("span") as HTMLSpanElement;
    cityText.textContent = `${savedData.name}, ${Math.floor(
      savedData.main.temp
    )}°C, Wind speed ${Math.floor(savedData.wind.speed)} km/h`;
    locationDiv.appendChild(cityText);

    const starImg = makeStar(true, () => {
      toggleFavorite(savedData);
      displayDataInMenu();
    }) as HTMLImageElement;
    locationDiv.appendChild(starImg);
    menuArticle.appendChild(locationDiv);
  });
}

function toggleFavorite(cityData: WeatherData): void {
  const savedFavorites: string | null = localStorage.getItem("savedWeatherData");
  let weatherArray: WeatherData[] = savedFavorites ? JSON.parse(savedFavorites) : [];

  if (weatherArray.some((data) => data.name === cityData.name)) {
    weatherArray = weatherArray.filter((data) => data.name !== cityData.name);
  } else {
    weatherArray.push(cityData);
  }

  localStorage.setItem("savedWeatherData", JSON.stringify(weatherArray));
  updateStarIcon();
}

async function fetchWeather(e: Event): Promise<void> {
  e.preventDefault();
  hideElements();
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
      weatherData = data;

      if (weatherData) {
        displayWeatherData();
        updateStarIcon();
      } else {
        searchedCityText.textContent = `No valid data found for "${searchedCity}"`;
      }
    }
  } catch (error) {
    console.error("Nu blev det fel!", error);
  }
}
