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
    icon: string;
    main: string;
    description: string;
}
interface Wind {
    speed: number;
}
export { WeatherData };
