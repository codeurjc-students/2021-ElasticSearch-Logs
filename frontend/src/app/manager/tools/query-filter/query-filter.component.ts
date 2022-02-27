import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/core/service/managerComunication.service';
import { DataProcessor } from 'src/app/core/util/dataProcessor.util';

import { COLUMN_DEFS } from '../../../table/config/table.config';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
})
export class QueryFilterComponent implements OnChanges {
  public columns: any;
  public queryFilter: FormGroup;

  constructor(
    private utilService: DataProcessor,
    private ManagerComunicationService: ManagerComunicationService
  ) {
    this.columns = COLUMN_DEFS.filter((column) => column.field != 'status');
    this.queryFilter = new FormGroup(
      this.utilService.buildFormControl(this.columns, '')
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambios recibidos');
  }

  queryFilterEmit(): void {
    const data = this.utilService.getDataFromForm(this.queryFilter);
    this.ManagerComunicationService.sendQueryFilters(data);
  }
}
