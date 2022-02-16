import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/service/managerComunication.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-highligther',
  templateUrl: './highligther.component.html',
  styleUrls: ['./highligther.component.css'],
})
export class HighligtherComponent {
  public highlighter: FormGroup;

  constructor(
    private utilService: UtilService,
    private ManagerComunicationService: ManagerComunicationService
  ) {
    this.highlighter = new FormGroup({
      stringToHighlight: new FormControl(''),
    });
  }

  /**
   * Builds the columns definitions to update in the table
   */
  stringToHighlightEmit(): void {
    const fields = this.utilService.getDataFromForm(this.highlighter)[1];
    this.ManagerComunicationService.sendStringToHighlight(fields[0]);
  }
}
