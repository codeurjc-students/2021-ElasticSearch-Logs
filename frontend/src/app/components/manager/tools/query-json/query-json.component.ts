import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { ComunicationService } from 'src/app/service/comunication.service';

@Component({
  selector: 'app-query-json',
  templateUrl: './query-json.component.html',
  styleUrls: ['./query-json.component.css'],
})
export class QueryJsonComponent {
  @Output('ngModelChange') update = new EventEmitter();

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

  constructor(private comunicationService: ComunicationService) {
    this.code = '';
    this.valid = false;
  }

  sendJSON() {
    const filters = JSON.parse(this.code);
    this.comunicationService.sendQueryFilters([
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
