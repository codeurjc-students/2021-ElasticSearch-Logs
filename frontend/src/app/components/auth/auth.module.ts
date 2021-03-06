import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from './components/auth.component';
import { RoutingModule } from 'src/app/routes/routing.module';
import { AuthRoutingModule } from './routes/auth-routing.module';
import { RequestService } from './interceptors/request.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

@NgModule({
    declarations: [LoginComponent, AuthComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        AuthRoutingModule,
    ],
    exports: [AuthComponent],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS,
            useFactory: function(router: Router) {
                return new RequestService(router);
              },
              multi: true,
              deps: [Router]
        }
    ]

})
export class AuthModule { }
