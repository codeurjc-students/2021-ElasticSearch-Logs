import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { LogService } from '../../service/log.service';

import { AgGridAngular } from 'ag-grid-angular';
import { ComunicationService } from 'src/app/service/comunication.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges, OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() columnsToDisplayData: string[] = [];
  @Input() queryFilterData: any[][] = [[], []];

  public page: number = 0;

  public loading: boolean = true;

  // Grid API
  private gridApi: any;

  // Loading overlay
  public overlayLoadingTemplate: any;

  // Column API
  private columnApi: any;

  // Columns definitions
  public columnDefs: any[];

  // Default columns config
  public defaultColDef: object;

  // Rows pre-loaded off view
  public rowBuffer: number;

  // Allow row selection
  public rowSelection: string;

  // Grid context
  public context: any;

  public components: any;

  // Grid data model
  public rowModelType: string;

  // Size of the block loaded by the datasource
  public cacheBlockSize: number;

  // Number of extra blank rows to display to the user at the end of the dataset
  public cacheOverflowSize: number;

  // Number of max concurrent request to fetch data from the server
  public maxConcurrentDatasourceRequests: number;

  // Number of blocks that will be stored in cache
  public maxBlocksInCache: any;

  // Height of each row
  public rowHeight: number;

  /**
   * Constructor
   * @param logService
   * @param utilService
   */
  public constructor(
    private logService: LogService,
    private comunicationService: ComunicationService
  ) {
    // Basic config
    this.rowModelType = 'infinite';

    this.columnDefs = [
      {
        field: 'timestamp',
        width: 250,
      },
      {
        field: 'message',
        width: 500,
      },
      {
        field: 'agent',
        width: 700,
        initialHide: true,
      },
      {
        field: 'clientip',
        width: 150,
      },
      {
        field: 'event',
        width: 200,
        initialHide: true,
      },
      {
        field: 'host',
        width: 250,
      },
      {
        field: 'request',
        width: 350,
      },
      {
        field: 'response',
        width: 120,
      },
      {
        field: 'url',
        width: 600,
      },
      {
        field: 'bytes',
        width: 100,
      },
      {
        field: 'extension',
        width: 120,
      },
      {
        field: 'geo',
        width: 150,
        initialHide: true,
      },
      {
        field: 'index',
        width: 200,
        initialHide: true,
      },
      {
        field: 'ip',
        width: 150,
        initialHide: true,
      },
      {
        field: 'ip_range',
        width: 200,
        initialHide: true,
      },
      {
        field: 'machine',
        width: 500,
        initialHide: true,
      },
      {
        field: 'memory',
        width: 150,
        initialHide: true,
      },
      {
        field: 'phpmemory',
        width: 150,
        initialHide: true,
      },
      {
        field: 'referer',
        width: 600,
        initialHide: true,
      },
      {
        field: 'tags',
        width: 150,
        initialHide: true,
      },
      {
        field: 'timestamp_range',
        width: 250,
        initialHide: true,
      },
      {
        field: 'utc_time',
        width: 250,
        initialHide: true,
      },
    ];

    this.defaultColDef = {
      wrapText: true,
      filter: true,
    };

    // Spinner
    this.overlayLoadingTemplate =
      '<img src="/assets/img/loading.gif" width="100px" height="100px"></img>';

    // Row options
    this.rowHeight = 200;
    this.rowBuffer = 10;
    this.rowSelection = 'multiple';

    // Infinite loading options
    this.cacheOverflowSize = 5;
    this.maxConcurrentDatasourceRequests = 5;
    this.maxBlocksInCache = 1;
    this.cacheBlockSize = 10;

    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    this.comunicationService.colDefsObservable.subscribe((data) => {
      // this.updateColDefs(data);
    });

    this.comunicationService.queryFilterObservable.subscribe((data) => {
      this.queryFilter(data);
    });
  }

  /**
   * Initialization for grid
   * @param params
   */
  public onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    let dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;

        this.logService.search([[], []], this.page).subscribe(
          (data) => {
            console.log(`asking for ${params.startRow} to ${params.endRow}`);
            console.log(this.page);
            let lastRow = data.length == 10 ? null : data.length;

            params.successCallback(data, lastRow);
            this.loading = false;
          },
          (err) => console.log(err)
        );
      },
    };

    params.api.setDatasource(dataSource);

    this.logService.search([[], []], this.page).subscribe(
      (data) => {
        // this.rowData = data;
        this.loading = false;
      },
      (err) => console.log(err)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi != null) {
      for (const propName in changes) {
        if (changes.hasOwnProperty(propName)) this.applyChanges(propName);
      }
    }
  }

  private applyChanges(propName: string): void {
    switch (propName) {
      case 'columnsToDisplayData': {
        // this.updateColDefs(this.columnsToDisplayData);
        break;
      }
      case 'queryFilterData': {
        this.queryFilter(this.queryFilterData);
        break;
      }
    }
  }

  /**
   * Update the columns definition
   * @param colDefs Array with the definitions columns
   */
  // private updateColDefs(colIds: string[]): void {
  //   const allColumns = this.columnApi.getAllColumns();
  //   const columnsToHide = allColumns.filter((c: string) => !colIds.includes(c));

  //   if (colIds.length > 0) {
  //     this.columnApi.setColumnsVisible(columnsToHide, false);
  //     this.columnApi.setColumnsVisible(colIds, true);
  //   } else {
  //     alert('Selecciona que columnas quieres mostrar.');
  //   }
  // }

  /**
   * Search in the database based on the filters
   * @param filters An array woth 2 arrays, the SearchTerms and the Fields
   */
  private queryFilter(filters: any[][]): void {
    this.logService.search(filters, this.page).subscribe(
      (data) => {
        this.gridApi.setRowData(data);
      },
      (err) => console.log(err)
    );
  }
}
