import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../service/log.service';

import { COLUMN_DEFS } from '../../config/table.config';
import { TABLE_STYLES } from '../../config/style.config';

import { AgGridAngular } from 'ag-grid-angular';
import { ComunicationService } from 'src/app/service/comunication.service';
import { UtilService } from 'src/app/util/util.service';

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

  // Custom componenets
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
    private utilService: UtilService,
    private logService: LogService,
    private comunicationService: ComunicationService
  ) {
    // Basic config
    this.rowModelType = 'infinite';

    // Colums definition
    this.columnDefs = COLUMN_DEFS;

    this.defaultColDef = {
      wrapText: true,
    };

    this.components = {
      loadingRenderer: function (params: any) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return ' <img width="50px" height="50px" src="/assets/img/loading.gif"></img>';
        }
      },
    };

    // Row options
    this.rowHeight = 150;
    this.rowBuffer = 10;
    this.rowSelection = 'multiple';
    this.fontSize = 14;

    // Infinite loading options
    this.cacheOverflowSize = 5;
    this.maxConcurrentDatasourceRequests = 5;
    this.maxBlocksInCache = 1;
    this.cacheBlockSize = 10;
    this.infiniteInitialRowCount = 7;

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

        this.logService.search([[], []], this.page, 'match').subscribe(
          (data) => {
            let lastRow = data.length == 10 ? null : data.length;
            params.successCallback(data, lastRow);
          },
          (err) => console.log(err)
        );
      },
    };
    params.api.setDatasource(dataSource);
  }

  ngOnInit(): void {
    this.comunicationService.colDefsObservable.subscribe((data) => {
      this.updateColDefs(data);
    });

    this.comunicationService.queryFilterObservable.subscribe((data) => {
      this.queryFilter(data);
    });

    this.comunicationService.stringToHighlightObservable.subscribe((data) => {
      this.highlight(data);
    });

    this.comunicationService.fontSizeObservable.subscribe((data) => {
      this.changeFontSize(data);
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
   * @param filters An array woth 2 arrays, the SearchTerms and the Fields
   */
  private queryFilter(filters: any[][]): void {
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;

        this.logService.search(filters, this.page, 'match').subscribe(
          (data) => {
            let lastRow = data.length == 10 ? null : data.length;
            params.successCallback(data, lastRow);
          },
          (err) => console.log(err)
        );
      },
    };

    this.gridApi.setDatasource(dataSource);
  }

  private highlight(stringToHighlight: string): void {
    const dataSource = {
      rowCount: null,
      getRows: (params: any) => {
        this.page = params.startRow / 10;

        this.logService
          .search(
            [
              this.utilService
                .getAllFieldsName()
                .filter((e) => e != 'timestamp'),
              [stringToHighlight],
            ],
            this.page,
            'wildcard'
          )
          .subscribe(
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
}
