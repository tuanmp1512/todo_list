import { Injectable } from '@angular/core';
import { CanActivate, Router,
        ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const checkLogin = localStorage.getItem('user') ? true : false;
        if (!checkLogin) {
            this.router.navigate(['/login']);
        }
        return checkLogin;
    }
}
