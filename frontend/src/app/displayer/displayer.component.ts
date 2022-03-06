import { Component, OnInit } from '@angular/core';
import { TableManagerComunicationService } from 'src/app/shared/service/tableComunication.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.css'],
})
export class DisplayerComponent implements OnInit {
  selectedLog: boolean;
  logLevelChip: keyof { ERROR: string; WARN: string; INFO: string } = 'INFO';
  logLevelStyle: string = 'secondary';
  displayedColumns: string[] = ['position', 'name'];
  dataSource: any = [];

  constructor(
    private tableManagerComunicationService: TableManagerComunicationService
  ) {
    this.selectedLog = false;
  }

  ngOnInit(): void {
    this.tableManagerComunicationService.rowPropertiesObservable.subscribe(
      (data) => {
        this.displayRowProperties(data);
      }
    );
  }

  displayRowProperties(data: any) {
    this.dataSource = Object.entries(data);
    this.logLevelChip = data.log_level;
    this.logLevelStyle = 'primary';
    this.selectedLog = true;
  }
}
