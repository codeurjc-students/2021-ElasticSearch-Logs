import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/util/util.service';
import { Output, EventEmitter } from '@angular/core';
import { ComunicationService } from 'src/app/service/comunication.service';

import { COLUMN_DEFS } from '../../../../config/table.config';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css'],
})
export class ColumnUpdaterComponent {
  public columns: any;
  public columnsToDisplay: FormGroup;

  constructor(
    private utilService: UtilService,
    private comunicationService: ComunicationService
  ) {
    this.columns = COLUMN_DEFS;
    this.columnsToDisplay = new FormGroup(
      this.utilService.buildFormControl(false)
    );
  }

  /**
   * Builds the columns definitions to update in the table
   */
  columnsToDisplayEmit(): void {
    const fields: string[] = this.utilService.getDataFromForm(
      this.columnsToDisplay
    )[0];
    this.comunicationService.sendColDefs(fields);
  }
}
