import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { UtilService } from 'src/app/util/util.service';
import { Output, EventEmitter } from '@angular/core';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css']
})
export class ColumnUpdaterComponent implements OnInit {

  @Output() columnsToUpdateEvent = new EventEmitter<ColDef[]>();

  public colDefNames: string[];
  public columns: any[];
  public profileForm: FormGroup;



  constructor(private logService: LogService, private utilService: UtilService) {

    this.colDefNames = this.logService.getColDefNames();
    this.columns = this.logService.getColumns();

    console.log(this.colDefNames)
    let formControls: { [key: string]: AbstractControl; } = this.utilService.buildFormControls(this.colDefNames, false);
    this.profileForm = new FormGroup(formControls);
  }

  ngOnInit(): void {

  }

  /**
   * Builds the columns definitions to update in the table
   */
  columnsToUpdateEmit(): void {
    const fields: string[] = this.utilService.getDataFromForm(this.profileForm)[0];
    let colDefs: ColDef[] = [];
    let columns:any = Object.assign({}, this.columns);

    // Set columns definitions by default
    if (fields.length == 0)
      colDefs = this.utilService.buildColumns(this.columns).slice(0, 9);
    else {
      const colNames: string[] = Object.keys(this.columns);

      for (let i = 0; i < colNames.length; i++) {
        if (!fields.includes(colNames[i])){
          console.log(colNames[i])
          delete columns[colNames[i]]
        }
      }
      colDefs = this.utilService.buildColumns(columns);
    }
    
    this.columnsToUpdateEvent.emit(colDefs);
  }

}
