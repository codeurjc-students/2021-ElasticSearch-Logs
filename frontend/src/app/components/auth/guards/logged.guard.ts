import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate(): boolean {
        if (!localStorage.getItem('logged')) {
            this.router.navigateByUrl('/login');
            return false;
        }

        return true;
    }
}
