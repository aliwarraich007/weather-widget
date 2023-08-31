import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnDestroy, OnInit {
  constructor(public authService: AuthService) {}
  subscription!: Subscription;
  user!: boolean;
  ngOnInit(): void {
    this.user = this.authService.user_state;
    this.listenToAuthChange();
  }
  listenToAuthChange() {
    this.subscription = this.authService.state_change.subscribe((data) => {
      this.user = data;
    });
  }
  onClick_logout() {
    this.authService.logout();
    this.listenToAuthChange();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
