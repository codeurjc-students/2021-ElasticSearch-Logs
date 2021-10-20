import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

import { ColDef, FieldElement } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { SearchRequest } from 'src/app/models/searchRequest';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  private defaultSearchRequest: SearchRequest = {
    fields: [],
    searchTerms: [],
    page: 0,
    size: 100,
  }

  // Ag-Grid configuration
  public columnsName: string[] = [
    // 'id',
    'timestamp',
    'agent',
    // 'bytes',
    'clientip',
    // 'event',
    'extension',
    // 'geo',
    'host',
    // 'index',
    // 'ip',
    // 'ip_range',
    // 'machine',
    // 'memory',
    'message',
    // 'phpmemory',
    // 'referer',
    'request',
    'response',
    // 'tags',

    // 'timestamp_range',
    'url',
    // 'utc_time'
  ];

  public columnDefs: ColDef[] = this.columnsName.map((column): any => {
    return { "field": column, sortable: true, filter: true }
  });

  public defaultColDef: Object = {
    width : 200,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    resizable: true,
  }

  rowData: Log[] = [];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.getLogs();
    this.columnDefs[0] = { "field": "timestamp", sortable: true, filter: true, checkboxSelection: true }
  }


  public getLogs(): void {
    this.logService.search(this.defaultSearchRequest).subscribe(
      (res: Log[]) => this.rowData = res,
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `\n- ${node.id}`).join('');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
