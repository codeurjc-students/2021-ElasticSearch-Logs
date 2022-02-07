import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComunicationService } from 'src/app/service/comunication.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-dialog-config',
  templateUrl: './dialog-config.component.html',
  styleUrls: ['./dialog-config.component.css'],
})
export class DialogConfigComponent implements OnInit {
  public fontSize: string = '';

  constructor(private comunicationService: ComunicationService) {
    this.fontSize = 'normal';
  }

  ngOnInit(): void {}

  fontSizeEmit(): void {
    this.comunicationService.sendFontSize(this.fontSize);
  }
}
