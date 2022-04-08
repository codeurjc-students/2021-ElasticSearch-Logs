import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogModule } from './components/log/log.module';
import { AuthModule } from './components/auth/auth.module';
import { AppComponent } from './components/app.component';
import { RoutingModule } from './routes/routing.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LogModule,
        AuthModule,
        RoutingModule,
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
