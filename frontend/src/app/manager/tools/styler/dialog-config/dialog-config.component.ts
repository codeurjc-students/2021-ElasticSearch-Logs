import { Component, OnInit } from '@angular/core';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';

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
