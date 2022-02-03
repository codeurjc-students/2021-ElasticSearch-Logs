import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ComunicationService } from 'src/app/service/comunication.service';
import { LogService } from 'src/app/service/log.service';
import { UtilService } from 'src/app/util/util.service';
import { COLUMN_DEFS } from '../../../../config/table.config';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
})
export class QueryFilterComponent {
  public columns: any;
  public queryFilter: FormGroup;

  constructor(
    private utilService: UtilService,
    private comunicationService: ComunicationService
  ) {
    this.columns = COLUMN_DEFS;
    this.queryFilter = new FormGroup(this.utilService.buildFormControl(''));
  }

  queryFilterEmit(): void {
    const data = this.utilService.getDataFromForm(this.queryFilter);
    this.comunicationService.sendQueryFilters(data);
  }
}
