import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogService } from './service/log.service';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ColumnUpdaterComponent } from './components/manager/tools/column-updater/column-updater.component';
import { TableComponent } from './components/table/table.component';
import { QueryFilterComponent } from './components/manager/tools/query-filter/query-filter.component';
import { ManagerComponent } from './components/manager/manager.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { QueryJsonComponent } from './components/manager/tools/query-json/query-json.component';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ColumnUpdaterComponent,
    TableComponent,
    QueryFilterComponent,
    ManagerComponent,
    QueryJsonComponent,
  ],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
