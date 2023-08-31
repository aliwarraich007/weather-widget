import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    protected loadingService: LoadingService
  ) {}
  title = 'forenax-angular';
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event) => {
          return (
            event instanceof NavigationEnd ||
            event instanceof NavigationStart ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
          );
        })
      )
      .subscribe((event: Event) => {
        this.loadingService.loading = event instanceof NavigationStart;
      });
    this.authService.autologin();
  }
}
