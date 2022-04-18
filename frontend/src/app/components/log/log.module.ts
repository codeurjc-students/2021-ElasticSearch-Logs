import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSharedModule } from './shared/logShared.module';
import { TableModule } from './components/table/table.module';
import { ManagerModule } from './components/manager/manager.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { DisplayerModule } from './components/displayer/displayer.module';
import { TableService } from './components/table/components/table.service';
import { HttpClientModule } from '@angular/common/http';
import { LogComponent } from './components/log.component';
import { LogRoutingModule } from './routes/log-routing.module';

@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LogSharedModule,
    TableModule,
    TimelineModule,
    DisplayerModule,
    ManagerModule,
    LogRoutingModule,
  ],
  exports: [LogComponent],
  providers: [TableService],
})
export class LogModule {}
