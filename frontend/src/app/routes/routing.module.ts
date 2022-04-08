import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from '../components/auth/routes/auth-routing.module';
import { LogRoutingModule } from '../components/log/routes/log-routing.module';

const routes: Routes = [];

@NgModule({
    imports: [AuthRoutingModule, LogRoutingModule],
    exports: [RouterModule],
})
export class RoutingModule {}
