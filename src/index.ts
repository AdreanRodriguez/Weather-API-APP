const ApiKey = "";

async function fetchWeather(): Promise<void> {
  try {
    const response: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${ApiKey}`
    );
    if (!response.ok) {
      throw "Det här fungerar ju verkligen inte";
    } else {
      let data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Nu blev det fel!");
  }
}
fetchWeather();
