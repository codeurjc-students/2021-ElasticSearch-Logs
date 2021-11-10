
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

import { ColDef, FieldElement } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { SearchRequest } from 'src/app/models/searchRequest';
import { UtilService } from 'src/app/util/util.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() updatedColDefs: ColDef[] = [];

  // Pagination configuration
  private defaultSearchRequest: SearchRequest = {
    fields: [],
    searchTerms: [],
    page: 0,
    size: 5000,
  }

  // Ag-Grid configuration
  private gridApi: any;
  private gridColumnApi: any;

  public defaultColDef: any
  public rowData: Log[] = [];
  public rowBuffer: number;
  public rowSelection: string;
  public rowModelType: string;
  public dataSource: any;
  public components: any;
  public paginationPageSize: number
  public cacheOverflowSize: number;
  public maxConcurrentDatasourceRequests: number;
  public infiniteInitialRowCount: number;
  public maxBlocksInCache: number;

  public frameworkComponents: any;

  public context: any;

  columnsName: string[] = [
    'timestamp',
    'message',
    'agent',
    'clientip',
    'event',
    'host',
    'request',
    'response',
    'url',
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
  ]

  /**
   * Constructor
   * @param logService 
   * @param utilService 
   */
  constructor(private logService: LogService, private utilService: UtilService) {

    this.context = {
      componentParent: this
    }

    this.defaultColDef = {
      width: 200,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };

    this.components = {
      loadingRenderer: function (params: any) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return "<img src=\"https://www.ag-grid.com/example-assets/loading.gif\">";
        }
      },
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.gridApi != null)
      this.updateColDefs(this.updatedColDefs);
  }

  /**
   * Initialization for grid
   * @param params 
   */
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var dataSource: any = this.logService.search(this.defaultSearchRequest).subscribe((data) => {
      var dataSource = {
        rowCount: null,
        getRows: function (params: any) {
          console.log(
            'asking for ' + params.startRow + ' to ' + params.endRow
          );
          setTimeout(function () {
            var rowsThisPage = data.slice(params.startRow, params.endRow);
            var lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        },
      };
      params.api.setDatasource(dataSource);
    });


    this.initColumns();
  }

  /**
   * Update the columns definition
   * @param colDefs Array with the definitions columns
   */
  private updateColDefs(colDefs: ColDef[]): void {
    this.gridApi.setColumnDefs(colDefs);
  }

  /**
   * Init default colums on grid reay
   */
  private initColumns(): void {
    let colDefs = this.utilService.buildColumns(this.columnsName).slice(0, 9)
    colDefs[0] = { "headerName": colDefs[0].headerName, "field": colDefs[0].field, sortable: true, filter: true, cellRenderer: 'loadingRenderer', };
    this.gridApi.setColumnDefs(colDefs);
  }


}
