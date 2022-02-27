import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [TimelineComponent],
  exports: [TimelineComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class TimelineModule {}
