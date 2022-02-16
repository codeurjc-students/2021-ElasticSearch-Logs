import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerComunicationService } from 'src/app/service/managerComunication.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-dialog-config',
  templateUrl: './dialog-config.component.html',
  styleUrls: ['./dialog-config.component.css'],
})
export class DialogConfigComponent implements OnInit {
  public fontSize: keyof { small: number; normal: number; large: number };

  constructor(private ManagerComunicationService: ManagerComunicationService) {
    this.fontSize = 'normal';
  }

  ngOnInit(): void {}

  fontSizeEmit(): void { 
    this.ManagerComunicationService.sendFontSize(this.fontSize);
  }
}
