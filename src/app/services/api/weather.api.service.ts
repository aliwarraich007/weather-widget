import { Injectable } from '@angular/core';
import { environment } from '../../environment/env.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Forcast } from 'src/app/interfaces/forecast.interface';
import { map, tap } from 'rxjs';
import { Logging } from '../../helper/decorators/logging.decorator';
import { CityCoords } from 'src/app/interfaces/geocoding_reverse';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  lat: string = '34.0522';
  lon: string = '-118.243';
  searchCity: string = '';
  constructor(private http: HttpClient) {}

  async getCurrentLocation() {
    return new Promise<GeolocationCoordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.lat = coords.latitude.toFixed(3);
          this.lon = coords.longitude.toFixed(3);
          resolve(coords);
        },
        (err) => reject(err)
      );
    });
  }

  @Logging()
  current_weather() {
    return this.http
      .get<Forcast>(`${environment.api}`, {
        params: new HttpParams().appendAll({
          lat: this.lat,
          lon: this.lon,
          appid: environment.key,
        }),
      })
      .pipe(
        map((item) => {
          let sliced_arr = item.daily.slice(0, 5);
          item.daily = sliced_arr;
          item.current.wind_speed = parseFloat(
            (item.current.wind_speed * 3.6).toFixed(1)
          );
          return item;
        }),
        tap((item) => {
          this.reverse_geocoding().subscribe((data) => {
            item.city = data[0].name + ' ' + data[0].country;
          });
        })
      );
  }

  reverse_geocoding() {
    return this.http.get<CityCoords[]>(environment.geocoding_api, {
      params: new HttpParams().appendAll({
        limit: 1,
        appid: environment.key,
        lat: this.lat,
        lon: this.lon,
      }),
    });
  }
  forward_geocoding() {
    return this.http.get<CityCoords[]>(environment.geocoding_forward, {
      params: new HttpParams().appendAll({
        appid: environment.key,
        q: this.searchCity,
      }),
    });
  }
}
