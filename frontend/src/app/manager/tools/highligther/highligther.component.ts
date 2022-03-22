import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';
import { DataProcessor } from 'src/app/shared/util/dataProcessor.service';

@Component({
    selector: 'app-highligther',
    templateUrl: './highligther.component.html',
    styleUrls: ['./highligther.component.scss'],
})
export class HighligtherComponent {
    public highlighter: FormGroup;

    constructor(
        private utilService: DataProcessor,
        private ManagerComunicationService: ManagerComunicationService
    ) {
        this.highlighter = new FormGroup({
            stringToHighlight: new FormControl(''),
        });
    }

    /**
     * Builds the columns definitions to update in the table
     *
     * @author cristian
     */
    stringToHighlightEmit(): void {
        const fields = this.utilService.getDataFromForm(
            this.highlighter
        )[1];
        this.ManagerComunicationService.sendStringToHighlight(fields[0]);
    }
}
