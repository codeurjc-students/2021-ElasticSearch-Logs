import { Component } from '@angular/core';
import { ManagerComunicationService } from 'src/app/components/log/shared/service/managerComunication.service';

@Component({
    selector: 'app-query-json',
    templateUrl: './query-json.component.html',
    styleUrls: ['./query-json.component.css'],
})
export class QueryJsonComponent {
    code: string;
    valid: boolean;

    editorOptions = {
        glyphMargin: false,
        folding: false,
        verticalScrollbarSize: 7,
        lineNumbersMinChars: 0,
        theme: 'vs-light',
        language: 'json',
        minimap: {
            enabled: false,
        },
    };

    constructor(
        private ManagerComunicationService: ManagerComunicationService
    ) {
        this.code = '';
        this.valid = false;
    }

    sendJSON() {
        const filters = JSON.parse(this.code);
        this.ManagerComunicationService.sendQueryFilters([
            Object.keys(filters),
            Object.values(filters),
        ]);
    }

    checkSyntax() {
        try {
            JSON.parse(this.code);
            this.valid = true;
        } catch (e) {
            this.valid = false;
        }
    }
}
