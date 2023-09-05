import { Component, OnInit } from '@angular/core';
import { Forcast } from 'src/app/interfaces/forecast.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/api/weather.api.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  response!: Forcast;
  icon!: string;
  city!: string;
  searchForm!: FormGroup;
  error_message: string = '';
  constructor(
    private activeRouter: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadingService.toggleLoading(true);
    this.activeRouter.data.subscribe({
      next: (data) => {
        const responseData = data[0];
        if (responseData instanceof Error)
          this.error_message = responseData.message;
        else {
          this.response = data[0];
          this.icon = this.response.current.weather[0].icon;
        }

        this.loadingService.toggleLoading(false);
      },
      error: (err) => {
        this.error_message = err;
        this.loadingService.toggleLoading(false);
      },
    });
    this.searchForm = new FormGroup({
      cityName: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.loadingService.toggleLoading(true);
    this.weatherService.searchCity = this.searchForm.value['cityName'];
    this.weatherService.forward_geocoding().subscribe((data) => {
      if (!data.length) {
        this.error_message = 'Invalid city name';
      } else {
        this.router.navigate(['/weather'], {
          relativeTo: this.activeRouter,
          queryParams: {
            latitude: data[0].lat.toFixed(3),
            longitude: data[0].lon.toFixed(3),
          },
        });
      }
      this.loadingService.toggleLoading(false);
      this.searchForm.reset();
    });
  }

  convertWindDirection(deg: number): string {
    if (deg === 0) return 'N';
    else if (deg > 0 && deg < 90) return 'NE';
    else if (deg === 90) return 'E';
    else if (deg > 90 && deg < 180) return 'SE';
    else if (deg === 180) return 'S';
    else if (deg > 180 && deg < 270) return 'SW';
    else if (deg === 270) return 'W';
    else return 'NW';
  }
}
