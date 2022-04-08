import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '../../../components/auth/guards/logged.guard';
import { LogComponent } from '../../../components/log/components/log.component';

const routes: Routes = [
    { path: '', component: LogComponent, canActivate: [LoggedGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class LogRoutingModule {}
