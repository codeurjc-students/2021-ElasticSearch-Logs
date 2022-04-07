import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';
import { DataProcessor } from 'src/app/shared/util/dataProcessor.service';

import { COLUMN_DEFS } from '../../../table/components/config/table.config';

@Component({
    selector: 'app-query-filter',
    templateUrl: './query-filter.component.html',
    styleUrls: ['./query-filter.component.scss'],
})
export class QueryFilterComponent {
    public columns: any;
    public queryFilter: FormGroup;

    constructor(
        private utilService: DataProcessor,
        private managerComunicationService: ManagerComunicationService
    ) {
        this.columns = COLUMN_DEFS.filter(
            (column) => column.field != 'status'
        );
        this.queryFilter = new FormGroup(
            this.utilService.buildFormControl(this.columns, '')
        );
    }

    queryFilterEmit(): void {
        const data = this.utilService.getDataFromForm(this.queryFilter);
        this.managerComunicationService.sendQueryFilters(data);
    }
}
