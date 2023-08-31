import { Forcast } from 'src/app/interfaces/forecast.interface';

export const daily = [
  {
    dt: 1693292400,
    sunrise: 1693269377,
    sunset: 1693315894,
    temp: {
      day: 27.85,
      min: 26.94,
      max: 37.95,
    },
    weather: [
      {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
  },
];

export const current = {
  dt: 1693250617,
  sunrise: 1693269377,
  sunset: 1693315894,
  temp: 27.99,
  feels_like: 31.77,
  humidity: 78,
  uvi: 0,
  wind_speed: 10.5,
  wind_deg: 110,
  weather: [
    {
      main: 'Smoke',
      description: 'smoke',
      icon: '50n',
    },
  ],
};

export const mockResponse: Forcast = {
  lat: 31.5204,
  lon: 74.3587,
  current,
  daily,
};
