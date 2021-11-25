import { Component, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

import { ColDef, Column } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { UtilService } from 'src/app/util/util.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() columnsToDisplayData: string[] = [];
  @Input() queryFilterData: any[][] = [[],[]];

  // Pixel to increment on scrolling
  private pixelIncrement:number = 4000;

  // Actual pixel
  private actualPixel: number = 4000;

  // Page
  private page:number = 0;

  // Ag-Grid API
  private gridApi: any;

  private columnApi: any;

  public columnDefs: any[];

  public defaultColDef: object;

  // Data set
  public rowData: Log[] = [];

  // Rows pre-loaded off view
  public rowBuffer: number;

  // Allow row selection
  public rowSelection: string;

  // Grid context
  public context: any;

  /**
   * Constructor
   * @param logService 
   * @param utilService 
   */
  public constructor(private logService: LogService, private utilService: UtilService) {
    this.columnDefs = [
      {
        field: "timestamp",
        width: 250
      },
      {
        field: "message",
        width: 500
      },
      {
        field: "agent",
        width: 700,
        initialHide: true
      },
      {
        field: "clientip",
        width: 150
      },
      {
        field: "event",
        width:200,
        initialHide:true
      },
      {
        field: "host",
        width: 250
      },
      {
        field: "request",
        width: 350
      },
      {
        field: "response",
        width: 120
      },
      {
        field: "url",
        width:600
      },
      {
        field: "bytes",
        width:100
      },
      {
        field: "extension",
        width:120
      },
      {
        field: "geo",
        width:150,
        initialHide:true
      },
      {
        field: "index",
        width:200,
        initialHide:true
      },
      {
        field: "ip",
        width:150,
        initialHide:true
      },
      {
        field: "ip_range",
        width:200,
        initialHide:true
      },
      {
        field: "machine",
        width:500,
        initialHide:true
      },
      {
        field: "memory",
        width:150,
        initialHide:true
      },
      {
        field: "phpmemory",
        width:150,
        initialHide:true
      },
      {
        field: "referer",
        width:600,
        initialHide:true
      },
      {
        field: "tags",
        width:150,
        initialHide:true
      },
      {
        field: "timestamp_range",
        width:250,
        initialHide:true
      },
      {
        field: "utc_time",
        width:250,
        initialHide:true
      }
    ];

    this.defaultColDef = {
      wrapText: true,
      autoHeight: true,
      filter: true
    };

    this.rowBuffer = 100;
    this.rowSelection = 'multiple';
    this.context = { componentParent: this }
  }

  /**
   * Initialization for grid
   * @param params 
   */
   public onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    this.logService.search([[], []],this.page).subscribe(
      (data) => {
        this.rowData = data
      },
      (err) => console.log(err)
    );
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
      case 'columnsToDisplayData': {
        this.updateColDefs(this.columnsToDisplayData);
        break;
      }
      case 'queryFilterData': {
        this.page = 0;
        this.actualPixel = 4000;
        this.search(this.queryFilterData);
        break;
      }
    }

  }

  
  bodyScroll(params: any) {
    const bottomPixel = this.gridApi.getVerticalPixelRange().bottom;

    if(bottomPixel > this.actualPixel){
      this.actualPixel += this.pixelIncrement;
      
      console.log(this.queryFilterData)

      let filters = this.queryFilterData.length == 0 ? [[],[]] : this.queryFilterData;
      this.page++;
      console.log(this.page)
      this.logService.search(filters,this.page).subscribe(
        (data) => {
          console.log(data)
          this.gridApi.applyTransaction({
            add: data
          })        
        },
        (err) => console.log(err)
      );
    }
  }

  /**
   * Update the columns definition
   * @param colDefs Array with the definitions columns
   */
  private updateColDefs(colIds: string[]): void {
    const allColumns = this.columnApi.getAllColumns();
    const columnsToHide = allColumns.filter((c:string) => !colIds.includes(c));

    if(colIds.length > 0){
      this.columnApi.setColumnsVisible(columnsToHide,false);
      this.columnApi.setColumnsVisible(colIds,true);
    } else {
      alert("Selecciona que columnas quieres mostrar.")
    }
     
  }

  /**
   * Search in the database based on the filters
   * @param filters An array woth 2 arrays, the SearchTerms and the Fields
   */
  private search(filters: any[][]): void {
    this.logService.search(filters,this.page).subscribe(
      (data) => {
        this.pixelIncrement = data.length*40;
        this.gridApi.setRowData(data)        
      },
      (err) => console.log(err)
    );
  }
}
