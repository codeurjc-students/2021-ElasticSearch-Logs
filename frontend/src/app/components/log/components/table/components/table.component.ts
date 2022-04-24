import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableService } from './table.service';
import { COLUMN_DEFS, TABLE_STYLES } from './config';
import { ManagerComunicationService } from '../../../shared/service/managerComunication.service';
import { TableManagerComunicationService } from '../../../shared/service/tableComunication.service';
import { DataProcessor } from '../../../shared/util/dataProcessor.service';
import {
  ColDef,
  ColumnMovedEvent,
  ColumnResizedEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { param } from 'cypress/types/jquery';
import { number } from 'echarts';

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
  public columnDefs: any[];

  // Default columns config
  public defaultColDef: ColDef;

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

  // Last row of the table
  private lastRow: number;

  /**
   *
   * @param utilService
   * @param tableService
   * @param managerComunicationService
   * @param tableManagerComunicationService
   * @param snackBar
   */
  public constructor(
    private utilService: DataProcessor,
    private tableService: TableService,
    private managerComunicationService: ManagerComunicationService,
    private tableManagerComunicationService: TableManagerComunicationService,
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
      cellStyle: {
        height: '100%',
        'line-height': '24px',
        'font-family': '"Ubuntu Mono", monospace',
      },
      resizable: true,
    };

    // Row options
    const scale = this.tableService.getScale();
    this.rowHeight = TABLE_STYLES.rowHeight[scale];
    this.fontSize = TABLE_STYLES.fontSize[scale];
    this.rowBuffer = 10;
    this.rowSelection = 'multiple';

    // Infinite loading options
    this.cacheOverflowSize = 5;
    this.maxConcurrentDatasourceRequests = 5;
    this.maxBlocksInCache = 1;
    this.cacheBlockSize = 10;
    this.infiniteInitialRowCount = 30;
    this.lastRow = 0;

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
        this.query([[], []], 'match', '@timestamp', 'ASC', params);
      },
    };
    this.gridApi.setDatasource(dataSource);
    // console.log(this.columnApi.getColumnState());

    const user = localStorage.getItem('logged');
    let currentUser = '';
    if (typeof user === 'string') currentUser = user;

    const state = localStorage.getItem(`${currentUser}_column_state`);
    let savedState: any = [];
    if (typeof state === 'string') savedState = JSON.parse(state);

    this.columnApi.applyColumnState({
      state: savedState.state,
      applyOrder: true,
    });
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

  onSelectionChanged(params: SelectionChangedEvent) {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.tableManagerComunicationService.sendRowProperties(selectedRows);
  }

  /**
   *
   * Saves in localStorage the columns sizes and their id for the logged user
   * @param params Parameters received from ag grid
   * @author cristian
   */
  onColumnResized(params?: ColumnResizedEvent) {
    this.tableService.updateTableState(this.columnApi.getColumnState());
  }

  onColumnMoved(params?: ColumnMovedEvent) {
    this.tableService.updateTableState(this.columnApi.getColumnState());
  }

  /**
   * Update the columns definition
   * @param colDefs Array with the definitions columns
   * @author cristian
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
   * @author cristian
   */
  private queryFilter(filters: any[][]): void {
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        this.query(filters, 'match', '@timestamp', 'DESC', params);
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  private highlight(stringToHighlight: string): void {
    this.lastRow = 0;
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        const filters = [
          this.utilService.getAllFieldsName().filter((e) => e != 'timestamp'),
          [stringToHighlight],
        ];
        this.lastRow = 0;

        this.tableService.search(filters, this.page, 'wildcard').subscribe(
          (data) => {
            const hData = this.utilService.highlightText(
              data,
              stringToHighlight
            );

            const lastRow = this.getLastRow(data.length);
            params.successCallback(hData, lastRow);
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
   * @author cristian
   */
  private changeFontSize(
    data: keyof { small: number; normal: number; large: number }
  ) {
    this.fontSize = TABLE_STYLES.fontSize[data];
    this.rowHeight = TABLE_STYLES.rowHeight[data];
    window.location.reload();
  }

  private dateFilter(dates: string[]) {
    this.lastRow = 0;
    console.table(dates);
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;
        const filters = [['@timestamp'], dates];
        this.query(filters, 'range', '@timestamp', 'ASC', params);
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  private query(
    filters: any[][],
    type: string,
    sortBy: string,
    order: string,
    params: any
  ) {
    this.lastRow = 0;
    this.tableService.search(filters, this.page, type, sortBy, order).subscribe(
      (data) => {
        if (data.length === 0) this.displayNoRowsMessage();
        const lastRow = this.getLastRow(data.length);
        params.successCallback(data, lastRow);
      },
      (err) => console.log(err)
    );
  }

  /**
   * It manage the state of the last row
   * If the fetched block is empty, return the lastRow
   * If the fetched block is a normal block, return null
   * If the fetched block is a smaller block, return the last row + blockSize
   *
   * @param blockSize The size of the data block fetched
   * @returns Null if we can continue scrolling, otherwise the last row
   * @author cristian
   */
  private getLastRow(blockSize: number): number | null {
    if (blockSize === 0) {
      return this.lastRow;
    }
    if (blockSize === 10) {
      this.lastRow += 10;
      return null;
    }
    return this.lastRow + blockSize;
  }

  private displayNoRowsMessage() {
    this.snackBar.open('No rows to show!', 'Close', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: 4000,
    });
  }
}
