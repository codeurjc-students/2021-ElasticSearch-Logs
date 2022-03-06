import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LogService } from './table/table.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineModule } from './timeline/timeline.module';
import { DisplayerModule } from './displayer/displayer.module';
import { CoreModule } from './shared/core.module';
import { TableModule } from './table/table.module';
import { ManagerModule } from './manager/manager.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    TableModule,
    TimelineModule,
    DisplayerModule,
    ManagerModule,
  ],
  declarations: [AppComponent],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
