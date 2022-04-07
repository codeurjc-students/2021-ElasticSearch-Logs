import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [TimelineComponent],
    exports: [TimelineComponent],
    imports: [
        CommonModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        MatSelectModule,
    ],
})
export class TimelineModule {}
