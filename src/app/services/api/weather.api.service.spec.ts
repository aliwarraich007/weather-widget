import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.api.service';
import { environment } from '../../environment/env.development';
import { CityCoords } from 'src/app/interfaces/geocoding_reverse';
import { mockResponse } from './shared/mockResponse.forcast';
import { Forcast } from 'src/app/interfaces/forecast.interface';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve forecast data and modify it as expected', () => {
    const dummyForecastResponse: Forcast = mockResponse;
    const dummyReverseGeocodingResponse: CityCoords = {
      name: 'Lahore',
      lat: 31.5656822,
      lon: 74.3141829,
      country: 'PK',
      state: 'Punjab',
    };

    spyOn(service, 'reverse_geocoding').and.returnValue(
      of([dummyReverseGeocodingResponse])
    );

    service.current_weather().subscribe((result) => {
      expect(result).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'https://api.openweathermap.org/data/2.5/onecall?exclude=alerts,hourly,minutely&units=metric&lat=34.0522&lon=-118.243&appid=0197b144eacd8d7b8a0f02ecd0cd852d'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyForecastResponse);
  });
  it('should forward geocode', () => {
    const mockResponse: CityCoords[] = [
      {
        name: 'Lahore',
        lat: 31.5656822,
        lon: 74.3141829,
        country: 'PK',
        state: 'Punjab',
      },
    ];
    const expectedUrl = `${environment.geocoding_forward}&appid=${environment.key}&q=`;

    service.forward_geocoding().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
function HttpHeaders(arg0: {
  normalizedNames: any;
  lazyUpdate: null;
  headers: any;
}) {
  throw new Error('Function not implemented.');
}
