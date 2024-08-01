import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isAdmin()
    ? true
    : inject(AuthenticationService).forbiddenAccess();
};
