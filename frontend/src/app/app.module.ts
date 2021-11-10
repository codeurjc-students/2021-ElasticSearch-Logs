import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogService } from './service/log.service';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ColumnUpdaterComponent } from './components/tools/column-updater/column-updater.component';
import { TableComponent } from './components/table/table.component';
import { QueryFilterComponent } from './components/tools/query-filter/query-filter.component';

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents(),
    HttpClientModule,
    ReactiveFormsModule

  ],
  declarations: [
    AppComponent,
    ColumnUpdaterComponent,
    TableComponent,
    QueryFilterComponent
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
