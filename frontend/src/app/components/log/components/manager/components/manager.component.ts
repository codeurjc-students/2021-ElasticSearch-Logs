import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/components/auth.service';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
    currentUser: string;

    constructor(private authService: AuthService, private router: Router) {
        const value = localStorage.getItem('logged');
        this.currentUser = '';

        if (typeof value === 'string') {
            this.currentUser = value;
        }
    }

    ngOnInit(): void {}

    onLogout() {
        this.authService.logout().subscribe({
            next: () => {
                localStorage.removeItem('logged');
                this.router.navigateByUrl('/login');
            },
            error: (error) => console.log(error),
        });
    }
}
