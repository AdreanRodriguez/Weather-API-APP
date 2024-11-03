interface WeatherData {
  name: string;
  main: Main;
  description: Weather[];
  wind: Wind;
}

interface Main {
  feels_like: number;
  humidity: number;
  temp: number;
}

interface Weather {
  description: string;
  icon: string;
  main: string;
}

interface Wind {
  speed: number;
}

export { WeatherData };
