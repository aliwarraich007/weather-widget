import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const authService: AuthService = inject(AuthService);
  if (authService.user_state) return true;
  else {
    const router: Router = inject(Router);
    return router.createUrlTree(['/auth']);
  }
};
