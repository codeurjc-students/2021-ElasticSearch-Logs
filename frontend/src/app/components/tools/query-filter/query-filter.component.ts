import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LogService } from 'src/app/service/log.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css']
})
export class QueryFilterComponent implements OnInit {

  @Output() queryFilterEvent = new EventEmitter<any[][]>();


  public queryFilter: FormGroup;


  constructor(private logService: LogService, private utilService: UtilService) {
    this.queryFilter = new FormGroup({
      timestamp: new FormControl(''),
      message: new FormControl(''),
      agent: new FormControl(''),
      clientip: new FormControl(''),
      event: new FormControl(''),
      host: new FormControl(''),
      request: new FormControl(''),
      response: new FormControl(''),
      url: new FormControl(''),
      bytes: new FormControl(''),
      extension: new FormControl(''),
      geo: new FormControl(''),
      index: new FormControl(''),
      ip: new FormControl(''),
      ip_range: new FormControl(''),
      machine: new FormControl(''),
      memory: new FormControl(''),
      phpmemory: new FormControl(''),
      referer: new FormControl(''),
      tags: new FormControl(''),
      timestamp_range: new FormControl(''),
      utc_time: new FormControl('')
    });
  }


  ngOnInit(): void {
  }

  queryFilterEmit(): void {
    const data = this.utilService.getDataFromForm(this.queryFilter);
    this.queryFilterEvent.emit(data);
  }

}
