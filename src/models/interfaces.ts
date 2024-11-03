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

export { WeatherData };
