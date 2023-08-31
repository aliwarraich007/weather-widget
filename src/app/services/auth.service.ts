import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WeatherService } from './api/weather.api.service';
import { LoadingService } from './loading.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user_state: boolean = false;
  user_username: string = 'forenax';
  private user_password: string = 'forenax';
  private auth_token: string = '41AC911B69E9C534513FFB93714E2';
  state_change: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private loadingService: LoadingService
  ) {}
  async login(username: string, password: string) {
    try {
      this.loadingService.toggleLoading(true);
      if (username === this.user_username && password === this.user_password) {
        this.user_state = true;
        sessionStorage.setItem('user', this.auth_token);
        this.state_change.next(true);
        const coords = await this.weatherService.getCurrentLocation();
        if (coords) {
          const location = {
            latitude: this.weatherService.lat,
            longitude: this.weatherService.lon,
          };
          this.router.navigate(['/weather'], { queryParams: location });
        }
        //this.loadingService.toggleLoading(false);
      } else console.log('invalid credientials');
    } catch (err) {
      this.router.navigate(['/weather']);
    }
  }
  logout() {
    this.user_state = false;
    this.state_change.next(false);
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  autologin() {
    const stored_token = sessionStorage.getItem('user');
    if (stored_token && stored_token === this.auth_token) {
      this.user_state = true;
      this.state_change.next(true);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
