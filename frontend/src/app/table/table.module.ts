import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [TableComponent],
  exports: [TableComponent],
  imports: [CommonModule, AgGridModule.withComponents()],
})
export class TableModule {}
