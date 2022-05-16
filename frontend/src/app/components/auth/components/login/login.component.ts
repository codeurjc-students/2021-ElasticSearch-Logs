import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './dto';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl(''),
        });
    }

    onSubmit(user: User) {
        this.authService.login(user).subscribe({
            next: (res) => {
           
                this.router.navigateByUrl('/');
                localStorage.setItem('logged', user.username);
            },
            error: () => alert('Wrong credentials'),
        });
    }
}
