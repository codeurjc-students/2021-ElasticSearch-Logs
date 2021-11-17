
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

import { ColDef, Column } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { SearchRequest } from 'src/app/models/searchRequest';
import { UtilService } from 'src/app/util/util.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() columnsToUpdateData: ColDef[] = [];
  @Input() queryFilterData: any[][] = [];

  // Ag-Grid configuration
  private gridApi: any;
  private gridColumnApi: any;

  public defaultColDef: any
  public rowData: Log[] = [];
  public rowBuffer: number;
  public rowSelection: string;
  public rowHeight: number;
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

  columns: any = {
    'timestamp' : 250,
    'message' : 1000,
    'agent': 700,
    'clientip':150,
    'event':200,
    'host':250,
    'request':350,
    'response':120,
    'url':600,
    'bytes':100,
    'extension':120,
    'geo':150,
    'index':200,
    'ip':150,
    'ip_range':200,
    'machine': 500,
    'memory':150,
    'phpmemory':150,
    'referer':600,
    'tags':150,
    'timestamp_range':250,
    'utc_time':250
  }

  /**
   * Constructor
   * @param logService 
   * @param utilService 
   */
  constructor(private logService: LogService, private utilService: UtilService) {

    this.context = {
      componentParent: this
    }

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
    this.rowHeight = 100;
    this.rowModelType = 'infinite';
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi != null) {
      for (const propName in changes) {
        if (changes.hasOwnProperty(propName))
          this.applyChanges(propName);

      }
    }
  }

  private applyChanges(propName: string): void {
    switch (propName) {
      case 'columnsToUpdateData': {
        this.updateColDefs(this.columnsToUpdateData);
        break;
      }
      case 'queryFilterData': {
        this.search(this.queryFilterData);
        break;
      }
    }

  }

  /**
   * Initialization for grid
   * @param params 
   */
  onGridReady(params: any) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.logService.search([[],[]]).subscribe(
      (data) => {
        let dataSource = this.utilService.buildDataSource(data);
        params.api.setDatasource(dataSource);
      },
      (err) => console.log(err)
    );
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
   * Search in the database based on the filters
   * @param filters An array woth 2 arrays, the SearchTerms and the Fields
   */
  private search(filters: any[][]):void {
    this.logService.search(filters).subscribe(
      (data) => {
        let dataSource = this.utilService.buildDataSource(data);
        this.gridApi.setDatasource(dataSource);
      },
      (err) => console.log(err)
    );
  }

  /**
   * Init default colums on grid reay
   */
  private initColumns(): void {
    let colDefs = this.utilService.buildColumns(this.columns).slice(0, 9)
    this.gridApi.setColumnDefs(colDefs);
  }

}
