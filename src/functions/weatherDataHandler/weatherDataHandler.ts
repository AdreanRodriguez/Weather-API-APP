import { WeatherData } from "../../models/interfaces";

function weatherDataHandler(data: WeatherData | null): WeatherData | null {
  if (!data) {
    console.log("NO DATA FOUND!!");
    return null; // Returnera `null` om datan saknas
  }

  // Lägg till eventuell bearbetning eller validering av `data` här
  console.log("DATA FOUND!!", data);

  // Returnera bearbetad eller validerad `WeatherData`
  return data;
}

export { weatherDataHandler };
