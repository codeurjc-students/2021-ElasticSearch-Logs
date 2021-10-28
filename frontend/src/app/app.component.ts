import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Form, AbstractControl } from '@angular/forms';
import { Component, ViewChild, Input } from '@angular/core';
import { Log } from './models/log';
import { LogService } from './service/log.service';

import { ColDef, FieldElement, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { SearchRequest } from 'src/app/models/searchRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  public profileForm: FormGroup;

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

  constructor(private logService: LogService) {
    let formControls: { [key: string]: AbstractControl; } = this.buildFormControls();
    this.profileForm = new FormGroup(formControls);

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


    this.updateColumns(false);
  }

  /**
   * Update the view of the columns in the table
   * @param fromForm Check if the method is called from the view
   */
  updateColumns(fromForm: boolean): void {
    if (!fromForm) {
      let colDefs = this.buildColumns(this.columnsName).slice(0, 9)
      colDefs[0] = { "headerName": colDefs[0].headerName, "field": colDefs[0].field, sortable: true, filter: true, cellRenderer: 'loadingRenderer', };
      this.gridApi.setColumnDefs(colDefs);
    }

    else {
      let newColumnsName = this.buildColumnsFromForm()

      if (newColumnsName.length != 0) {
        let newColDefs = this.buildColumns(newColumnsName);
        newColDefs[0] = { "headerName": newColDefs[0].headerName, "field": newColDefs[0].field, sortable: true, filter: true, cellRenderer: 'loadingRenderer', };
        this.gridApi.setColumnDefs(newColDefs);
      }

      else {
        let colDefs = this.buildColumns(this.columnsName).slice(0, 9)
        colDefs[0] = { "headerName": colDefs[0].headerName, "field": colDefs[0].field, sortable: true, filter: true, cellRenderer: 'loadingRenderer', };
        this.gridApi.setColumnDefs(colDefs);
      }

    }
  }

  /**
   * Build an array of String with the columns name to build dynamically columns later
   * @returns An array with the columns name
   */
  buildColumnsFromForm(): string[] {
    const formDataKeys: string[] = Object.keys(this.profileForm.value);
    const formDataValues: boolean[] = Object.values(this.profileForm.value);

    let newColumnsName: string[] = []

    for (let i = 0; i < formDataKeys.length; i++) {
      const key = formDataKeys[i];
      const value = formDataValues[i];

      if (value)
        newColumnsName.push(key);
    }

    return newColumnsName;
  }

  /**
   * Build the form controls for the form group
   * @returns An object with the form controls
   */
  buildFormControls(): { [key: string]: AbstractControl; } {
    let formControls = {}
    this.columnsName.map((name): any => {
      Object.assign(formControls, { [name]: new FormControl(false) })
    })

    return formControls;
  }

  /**
   * Build the columns of the table
   * @param columnsToBuild An array with the name of the columns
   * @returns An array with the columns created
   */
  buildColumns(columnsToBuild: String[]): ColDef[] {
    return columnsToBuild.map((column): any => {
      return { "headerName": column, "field": column, sortable: true, filter: true }
    })

  }

  /**
   * Get a apge of logs from the backend
   */
  getLogs(): void {

  }
  


}
