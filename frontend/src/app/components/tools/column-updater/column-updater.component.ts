import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css']
})
export class ColumnUpdaterComponent {

  @Output() columnsToDisplayEvent = new EventEmitter<string[]>();

  public columnsToDisplay: FormGroup;

  constructor(private utilService: UtilService) {

    this.columnsToDisplay = new FormGroup({
      timestamp: new FormControl(false),
      message: new FormControl(false),
      agent: new FormControl(false),
      clientip: new FormControl(false),
      event: new FormControl(false),
      host: new FormControl(false),
      request: new FormControl(false),
      response: new FormControl(false),
      url: new FormControl(false),
      bytes: new FormControl(false),
      extension: new FormControl(false),
      geo: new FormControl(false),
      index: new FormControl(false),
      ip: new FormControl(false),
      ip_range: new FormControl(false),
      machine: new FormControl(false),
      memory: new FormControl(false),
      phpmemory: new FormControl(false),
      referer: new FormControl(false),
      tags: new FormControl(false),
      timestamp_range: new FormControl(false),
      utc_time: new FormControl(false)
    });
  }

  /**
   * Builds the columns definitions to update in the table
   */
   columnsToDisplayEmit(): void {
    const fields: string[] = this.utilService.getDataFromForm(this.columnsToDisplay)[0];
    this.columnsToDisplayEvent.emit(fields);
  }

}
