import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from './table.service';
import { COLUMN_DEFS, TABLE_STYLES } from './config';
import { ManagerComunicationService } from '../shared/service/managerComunication.service';
import { TableManagerComunicationService } from '../shared/service/tableComunication.service';
import { DataProcessor } from '../shared/util/dataProcessor.util';
import { DateService } from '../shared/service/date.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  // Page number
  public page: number = 0;

  public loading: boolean = true;

  // Grid API
  private gridApi: any;

  // Column API
  private columnApi: any;

  // Columns definitions
  public columnDefs: object[];

  // Default columns config
  public defaultColDef: object;

  // Rows pre-loaded off view
  public rowBuffer: number;

  // Allow row selection
  public rowSelection: string;

  // Grid context
  public context: object;

  // Grid data model
  public rowModelType: string;

  // Size of the block loaded by the datasource
  public cacheBlockSize: number;

  // Number of extra blank rows to display to the user at the end of the dataset
  public cacheOverflowSize: number;

  // Number of max concurrent request to fetch data from the server
  public maxConcurrentDatasourceRequests: number;

  // Number of blocks that will be stored in cache
  public maxBlocksInCache: number;

  public infiniteInitialRowCount: number;

  // Height of each row
  public rowHeight: number;

  // Font size of the rows
  public fontSize: number;

  /**
   * Constructor
   * @param logService
   * @param utilService
   */
  public constructor(
    private utilService: DataProcessor,
    private logService: LogService,
    private managerComunicationService: ManagerComunicationService,
    private tableManagerComunicationService: TableManagerComunicationService,
    private dateService: DateService,
    private snackBar: MatSnackBar
  ) {
    // Basic config
    this.rowModelType = 'infinite';

    // Colums definition
    this.columnDefs = COLUMN_DEFS;

    // Default columns defs
    this.defaultColDef = {
      wrapText: true,
      cellRenderer: (params: any) => {
        return params.value != undefined || null ? params.value : params.value;
      },
      style: {
        height: '50%',
      },
    };

    // Row options
    this.rowHeight = 100;
    this.rowBuffer = 10;
    this.rowSelection = 'multiple';
    this.fontSize = 14;

    // Infinite loading options
    this.cacheOverflowSize = 5;
    this.maxConcurrentDatasourceRequests = 5;
    this.maxBlocksInCache = 1;
    this.cacheBlockSize = 10;
    this.infiniteInitialRowCount = 7;

    // Table context
    this.context = { componentParent: this };
  }

  /**
   * Initialization for grid
   * @param params
   */
  public onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        this.query([[], []], this.page, 'match', '@timestamp', 'DESC', params);
      },
    };
    this.gridApi.setDatasource(dataSource);
  }

  onSelectionChanged(params: any) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.tableManagerComunicationService.sendRowProperties(selectedRows);
  }

  ngOnInit(): void {
    this.managerComunicationService.colDefsObservable.subscribe((data) => {
      this.updateColDefs(data);
    });

    this.managerComunicationService.queryFilterObservable.subscribe((data) => {
      this.queryFilter(data);
    });

    this.managerComunicationService.stringToHighlightObservable.subscribe(
      (data) => {
        this.highlight(data);
      }
    );

    this.managerComunicationService.fontSizeObservable.subscribe((data) => {
      this.changeFontSize(data);
    });

    this.managerComunicationService.rangeFiltersObservable.subscribe((data) => {
      this.dateFilter(data);
    });
  }

  /**
   * Update the columns definition
   * @param colDefs Array with the definitions columns
   */
  private updateColDefs(colIds: string[]): void {
    const allColumns = this.columnApi.getAllColumns();
    const columnsToHide = allColumns.filter((c: string) => !colIds.includes(c));

    if (colIds.length > 0) {
      this.columnApi.setColumnsVisible(columnsToHide, false);
      this.columnApi.setColumnsVisible(colIds, true);
    } else {
      alert('Selecciona que columnas quieres mostrar.');
    }
  }

  /**
   * Search in the database based on the filters
   * @param filters An array with 2 arrays, the SearchTerms and the Fields
   */
  private queryFilter(filters: any[][]): void {
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        this.query(filters, this.page, 'match', '@timestamp', 'DESC', params);
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  private highlight(stringToHighlight: string): void {
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        const filters = [
          this.utilService.getAllFieldsName().filter((e) => e != 'timestamp'),
          [stringToHighlight],
        ];
        this.logService.search(filters, this.page, 'wildcard').subscribe(
          (data) => {
            const highlightedData = this.utilService.highlightText(
              data,
              stringToHighlight
            );
            let lastRow = data.length == 10 ? null : data.length;
            params.successCallback(highlightedData, lastRow);
          },
          (err) => console.log(err)
        );
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  /**
   * Change the table data font size
   * @param data A key wich posible values { small: 12; normal: 14; large: 16 }
   */
  private changeFontSize(
    data: keyof { small: number; normal: number; large: number }
  ) {
    this.fontSize = TABLE_STYLES.fontSize[data];
  }

  private dateFilter(dates: string[]) {
    console.log(dates);

    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        this.query(
          [['@timestamp'], dates],
          this.page,
          'range',
          '@timestamp',
          'DESC',
          params
        );
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  private query(
    filters: any[][],
    page: number,
    type: string,
    sortBy: string,
    order: string,
    params: any
  ) {
    this.logService.search(filters, this.page, type, sortBy, order).subscribe(
      (data) => {
        if (data.length === 0) {
          this.snackBar.open('No rows to show!', 'Close', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 2000,
          });
        }
        let lastRow = data.length == 10 ? null : data.length;
        params.successCallback(data, lastRow);
      },
      (err) => console.log(err)
    );
  }
}
