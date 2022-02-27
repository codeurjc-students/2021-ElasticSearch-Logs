import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ManagerComunicationService } from 'src/app/core/service/managerComunication.service';
import { DataProcessor } from 'src/app/core/util/dataProcessor.util';

import { COLUMN_DEFS } from '../../../table/config/table.config';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css'],
})
export class ColumnUpdaterComponent {
  public columns: any;
  public columnsToDisplay: FormGroup;

  constructor(
    private utilService: DataProcessor,
    private ManagerComunicationService: ManagerComunicationService
  ) {
    this.columns = COLUMN_DEFS.filter((column) => column.field != 'status');
    this.columnsToDisplay = new FormGroup(
      this.utilService.buildFormControl(this.columns, false)
    );
  }

  /**
   * Builds the columns definitions to update in the table
   */
  columnsToDisplayEmit(): void {
    const fields: string[] = this.utilService.getDataFromForm(
      this.columnsToDisplay
    )[0];
    this.ManagerComunicationService.sendColDefs(fields);
  }
}
