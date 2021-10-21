import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, Input } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

import { ColDef, FieldElement, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { SearchRequest } from 'src/app/models/searchRequest';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  // Pagination configuration
  private defaultSearchRequest: SearchRequest = {
    fields: [],
    searchTerms: [],
    page: 0,
    size: 100,
  }

  // Ag-Grid configuration
  private gridApi: any;
  private gridColumnApi: any;

  public defaultColDef: any
  public rowData: Log[] = [];

  normalColumnsName: string[] = [
    'timestamp',
    'message',
    'agent',
    'clientip',
    'event',
    'host',
    'request',
    'response',
    'url',
  ];
  
  advancedColumnsName: string[] = [
    'timestamp',
    'agent',
    'bytes',
    'clientip',
    'event',
    'extension',
    'geo',
    'host',
    'index',
    'ip',
    'ip_range',
    'machine',
    'memory',
    'message',
    'phpmemory',
    'referer',
    'request',
    'response',
    'tags',
    'timestamp_range',
    'url',
    'utc_time'
  ];

  constructor(private logService: LogService) {
    this.defaultColDef = {
      width: 200,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    }
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getLogs();
    this.updateColumnsMode(false);
  }

  updateColumnsMode(advancedMode: boolean): void {
    if(!advancedMode){
      this.gridApi.setColumnDefs(this.buildColumns(this.normalColumnsName));
    } else {
      this.gridApi.setColumnDefs(this.buildColumns(this.advancedColumnsName));
    }
  }

  buildColumns(columnsToBuild: String[]): ColDef[] {
    return columnsToBuild.map((column): any => {
      return { "headerName": column, "field": column, sortable: true, filter: true }
    })

  }

  getLogs(): void {
    this.logService.search(this.defaultSearchRequest).subscribe(
      (res: Log[]) => this.rowData = res,
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

}




