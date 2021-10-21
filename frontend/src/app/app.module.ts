import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogService } from './service/log.service';

import { AgGridModule } from 'ag-grid-angular';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [
    AppComponent,
    TableComponent,
  ],
  providers: [LogService],
  bootstrap: [AppComponent, TableComponent]
})
export class AppModule { }
