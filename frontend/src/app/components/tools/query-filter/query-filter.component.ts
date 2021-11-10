import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LogService } from 'src/app/service/log.service';
import { UtilService } from 'src/app/util/util.service';

@Component({
  selector: 'app-query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css']
})
export class QueryFilterComponent implements OnInit {

  @Output() queryFilterEvent = new EventEmitter<any[][]>();

  public colDefNames: string[];
  public profileForm: FormGroup;


  constructor(private logService: LogService, private utilService: UtilService) {
    this.colDefNames = this.logService.getColDefNames();

    let formControls: { [key: string]: AbstractControl; } = this.utilService.buildFormControls(this.colDefNames,"");
    this.profileForm = new FormGroup(formControls);
  }


  ngOnInit(): void {
  }

  queryFilterEmit(): void {
    const data = this.utilService.getDataFromForm(this.profileForm);
    this.queryFilterEvent.emit(data);
  }

}
