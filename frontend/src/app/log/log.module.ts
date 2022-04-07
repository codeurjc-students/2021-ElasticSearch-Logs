import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../shared/core.module';
import { TableModule } from './layout/table/table.module';
import { ManagerModule } from './layout/manager/manager.module';
import { TimelineModule } from './layout/timeline/timeline.module';
import { DisplayerModule } from './layout/displayer/displayer.module';
import { LogService } from './layout/table/table.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';

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
