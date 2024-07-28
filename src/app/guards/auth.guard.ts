import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isLoggedIn()
    ? true
    : inject(Router).navigate(['/login']);
};
