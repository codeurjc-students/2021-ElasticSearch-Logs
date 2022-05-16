import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './login/dto';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url: string = environment.BASE_API_URL;

    constructor(private httpClient: HttpClient) {}

    login(user: User) {
        return this.httpClient.post(`${this.url}/auth/login`, user, {
            withCredentials: true
        });
    }

    logout() {
        return this.httpClient.post(`${this.url}/auth/logout`, {
            withCredentials: true,
        });
    }
}
