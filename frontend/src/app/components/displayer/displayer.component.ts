import { Component, OnInit } from '@angular/core';
import { TableManagerComunicationService } from 'src/app/service/tableComunication.service';

import { TABLE_STYLES } from '../../config/style.config';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css']
})
export class DisplayerComponent implements OnInit {

  logLevelChip: keyof { ERROR: string; WARN: string; INFO: string } = 'INFO';
  logLevelStyle:string = 'secondary'
  displayedColumns: string[] = ['position', 'name'];
  dataSource:any = [];

  constructor(private tableManagerComunicationService: TableManagerComunicationService) { }

  ngOnInit(): void {
    this.tableManagerComunicationService.rowPropertiesObservable.subscribe((data) => {
      this.displayRowProperties(data);
    });
  }

  displayRowProperties(data: any) {
    this.dataSource = Object.entries(data)
    this.logLevelChip = data.log_level;
    this.logLevelStyle = 'primary'
  }

}
