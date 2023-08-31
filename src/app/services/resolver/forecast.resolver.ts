import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Forcast } from '../../interfaces/forecast.interface';
import { inject } from '@angular/core';
import { WeatherService } from '../api/weather.api.service';
import { catchError, of } from 'rxjs';
import { CityCoords } from 'src/app/interfaces/geocoding_reverse';

export const forecastResolver: ResolveFn<[CityCoords, Forcast]> | any = (
  route: ActivatedRouteSnapshot
) => {
  const forecastService: WeatherService = inject(WeatherService);
  const { latitude, longitude } = route.queryParams;
  if (latitude && longitude) {
    forecastService.lat = latitude;
    forecastService.lon = longitude;
  }
  const $currentWeahter = forecastService.current_weather().pipe(
    catchError((err) => {
      return of(err);
    })
  );
  return $currentWeahter;
};
