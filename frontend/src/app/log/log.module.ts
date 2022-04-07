import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/core.module';
import { TableModule } from './components/table/table.module';
import { ManagerModule } from './components/manager/manager.module';
import { TimelineModule } from './components/timeline/timeline.module';
import { DisplayerModule } from './components/displayer/displayer.module';
import { LogService } from './components/table/components/table.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/log.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        CoreModule,
        TableModule,
        TimelineModule,
        DisplayerModule,
        ManagerModule,
    ],
    exports: [LayoutComponent],
    providers: [LogService],
})
export class LogModule {}
