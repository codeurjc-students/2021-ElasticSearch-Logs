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
import { MatRadioModule } from '@angular/material/radio';
import { QueryJsonComponent } from './components/manager/tools/query-json/query-json.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { HighligtherComponent } from './components/manager/tools/highligther/highligther.component';
import { StylerComponent } from './components/manager/tools/styler/styler.component';
import { DialogConfigComponent } from './components/manager/tools/styler/dialog-config/dialog-config.component';
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
    MatMenuModule,
    MatRadioModule,
    MatDialogModule,
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
    HighligtherComponent,
    StylerComponent,
    DialogConfigComponent,
  ],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
