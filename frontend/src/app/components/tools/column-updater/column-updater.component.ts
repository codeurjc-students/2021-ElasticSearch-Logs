import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { UtilService } from 'src/app/util/util.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css']
})
export class ColumnUpdaterComponent implements OnInit {

  @Output() updateColDefs = new EventEmitter<ColDef[]>();

  public profileForm: FormGroup;

  columnsName: string[] = [
    'timestamp',
    'message',
    'agent',
    'clientip',
    'event',
    'host',
    'request',
    'response',
    'url',
    'agent',
    'bytes',
    'clientip',
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
    'timestamp_range',
    'url',
    'utc_time'
  ]

  params: any;
  componentParent: any;

  constructor(private utilService: UtilService) {
    let formControls: { [key: string]: AbstractControl; } = this.utilService.buildFormControls(this.columnsName);
    this.profileForm = new FormGroup(formControls);
  }

  ngOnInit(): void {

  }

  /**
   * Builds the columns definitions to update in the table
   */
  columnsToUpdate(): void {
    const fields: string[] = this.utilService.getColumnsNameFromForm(this.profileForm);
    let colDefs: ColDef[] = [];

    // Set columns definitions by default
    if (fields.length == 0)
      colDefs = this.utilService.buildColumns(this.columnsName).slice(0, 9);
    else
      colDefs = this.utilService.buildColumns(fields);

    this.updateColDefs.emit(colDefs);
  }

}
