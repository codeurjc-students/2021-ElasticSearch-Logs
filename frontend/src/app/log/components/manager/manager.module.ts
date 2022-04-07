import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './components/manager.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { StylerComponent } from './components/styler/styler.component';
import { ColumnUpdaterComponent } from './components/column-updater/column-updater.component';
import { HighligtherComponent } from './components/highligther/highligther.component';
import { QueryFilterComponent } from './components/query-filter/query-filter.component';
import { QueryJsonComponent } from './components/query-json/query-json.component';
import { TimeShortcutsComponent } from './components/time-shortcuts/time-shortcuts.component';
import { DialogConfigComponent } from './components/styler/dialog-config/dialog-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        ManagerComponent,
        ColumnUpdaterComponent,
        HighligtherComponent,
        QueryFilterComponent,
        QueryJsonComponent,
        StylerComponent,
        DialogConfigComponent,
        TimeShortcutsComponent,
    ],
    exports: [ManagerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MonacoEditorModule.forRoot(),
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
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatFormFieldModule,
    ],
})
export class ManagerModule {}
