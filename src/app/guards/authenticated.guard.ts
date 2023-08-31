import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthenticatedGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.user_state) {
    return router.createUrlTree(['']);
  } else {
    return true;
  }
};
