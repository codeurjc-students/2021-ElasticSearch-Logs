import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from './models/log';
import { LogService } from './service/log.service';

import { ColDef, FieldElement } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  columnsToDisplayData: string[];
  queryFilterData: any[][];

  constructor() {
    this.columnsToDisplayData = [];
    this.queryFilterData = [];
  }

  ngOnInit() {

  }

  columnsToDisplayHandler(colIds: string[]) {
    this.columnsToDisplayData = colIds;
  }

  queryFilterHandler(data: any[][]) {
    this.queryFilterData = data;
  }
}
