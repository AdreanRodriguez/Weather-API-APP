const ApiKey = "90b1153e7229ea734ad261381557d7c0";

window.addEventListener("load", (): void => {
  fetchWeather();
});

async function fetchWeather(): Promise<void> {
  try {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=årjäng&appid=${ApiKey}`
    );
    if (!response.ok) {
      throw "Det här fungerar ju verkligen inte";
    } else {
      let data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Nu blev det fel!", error);
  }
}

const barRef = document.querySelector(".bar") as HTMLDivElement;
barRef.addEventListener("click", (): void => {
  console.log("baren är klickad");
});

const searchRefBlack = document.querySelector(".magnifying-glass-black") as HTMLImageElement;
const searchInputRef = document.querySelector(".search-input") as HTMLInputElement;
const searchRefWhite = document.querySelector(".magnifying-glass-white") as HTMLImageElement;

searchRefWhite?.addEventListener("click", (): void => {
  searchRefBlack?.classList.remove("hide");
  searchInputRef?.classList.remove("hide");
  searchRefWhite.classList.add("hide");
});

searchRefBlack?.addEventListener("click", (): void => {
  searchRefBlack?.classList.add("hide");
  searchInputRef?.classList.add("hide");
  searchRefWhite.classList.remove("hide");
});
