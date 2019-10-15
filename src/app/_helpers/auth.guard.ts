import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    titleCase(str) {
      str = str.toLowerCase();
      return str = str.charAt(0).toUpperCase() + str.slice(1);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
          // check if route is restricted by role
          let routeData_role = route.data.roles;
          if (routeData_role && route.data.roles.indexOf(this.titleCase(currentUser.role)) === -1) { console.log(routeData_role, this.titleCase(currentUser.role));
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
          }
          // logged in so return true
          return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
