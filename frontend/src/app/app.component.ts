import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  columnsToDisplayData: string[];
  queryFilterData: any[][];

  constructor() {
    this.columnsToDisplayData = [];
    this.queryFilterData = [];
  }

  ngOnInit() {}

  columnsToDisplayHandler(colIds: string[]) {
    this.columnsToDisplayData = colIds;
  }

  queryFilterHandler(data: any[][]) {
    this.queryFilterData = data;
  }
}
