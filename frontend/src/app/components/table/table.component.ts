import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Form, AbstractControl } from '@angular/forms';
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

  public profileForm: FormGroup;

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
    }
  }

  /**
   * Initialization for grid
   * @param params 
   */
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getLogs();
    this.updateColumns(false);
  }

  /**
   * Update the view of the columns in the table
   * @param fromForm Check if the method is called from the view
   */
  updateColumns(fromForm: boolean): void {
    if (!fromForm)
      this.gridApi.setColumnDefs(this.buildColumns(this.columnsName).slice(0, 9));
    else {
      const newColumnsName = this.buildColumnsFromForm()

      if (newColumnsName.length != 0)
        this.gridApi.setColumnDefs(this.buildColumns(newColumnsName));
      else
        this.gridApi.setColumnDefs(this.buildColumns(this.columnsName).slice(0, 9));

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
    this.logService.search(this.defaultSearchRequest).subscribe(
      (res: Log[]) => this.rowData = res,
      (error: HttpErrorResponse) => alert(error.message)
    );
  }

}




