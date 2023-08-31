import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.api.service';
import { environment } from '../../environment/env.development';
import { daily, current } from './shared/mockResponse.forcast';
import { CityCoords } from 'src/app/interfaces/geocoding_reverse';
import { of } from 'rxjs';
describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should transform weather data correctly', (done: DoneFn) => {
    const expectedUrl = `${environment.api}&lat=${service.lat}&lon=${service.lon}&appid=${environment.key}`;
    const mockApiResponse = {
      daily,
      current,
    };
    const dummyReverseGeocodingResponse: CityCoords = {
      name: 'Lahore',
      lat: 31.5656822,
      lon: 74.3141829,
      country: 'PK',
      state: 'Punjab',
    };
    service.current_weather().subscribe((transformedData) => {
      expect(transformedData.daily.length).toBe(1);
      expect(transformedData.current.wind_speed).toBeCloseTo(37.8);
      expect(transformedData.city).toBe('Lahore PK');
      done();
    });

    spyOn(service, 'reverse_geocoding').and.returnValue(
      of([dummyReverseGeocodingResponse])
    );

    const weatherRequest = httpMock.expectOne(expectedUrl);
    weatherRequest.flush(mockApiResponse);
  });
});
