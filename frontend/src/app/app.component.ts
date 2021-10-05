import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Log } from './model/log';
import { LogService } from './service/log.service';
import { ColDef, FieldElement } from 'ag-grid-community';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public columnsName: string[] = [
    'id',
    'agent',
    'bytes',
    'clientIp',
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
    'timestamp',
    'timestamp_range',
    'url',
    'utc_time'
  ];

  public columnDefs: ColDef[] = this.columnsName.map((column): any => {
    return { "field": column }
  });


  rowData: Log[] = [];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.getLogsByExtension();
  }

  public getLogsByExtension(): void {
    this.logService.getLogsByExtension('deb').subscribe(
      (res: Log[]) => this.rowData = res,
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
}
