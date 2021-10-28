import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogService } from './service/log.service';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ColumnUpdaterComponent } from './components/column-updater/column-updater.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents(),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [
    AppComponent,
    ColumnUpdaterComponent,
    TableComponent,
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
