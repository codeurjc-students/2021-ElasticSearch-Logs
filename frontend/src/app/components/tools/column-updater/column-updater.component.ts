import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { OptionsService } from 'src/app/service/option.service';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css']
})
export class ColumnUpdaterComponent implements OnInit {

  public profileForm: FormGroup;

  columnsName: string[] = [
    'timestamp',
    'message',
    'agent',
    'clientip',
    'event',
    'host',
    'request',
    'response',
    'url',
    'agent',
    'bytes',
    'clientip',
    'event',
    'extension',
    'geo',
    'host',
    'index',
    'ip',
    'ip_range',
    'machine',
    'memory',
    'message',
    'phpmemory',
    'referer',
    'request',
    'response',
    'tags',
    'timestamp_range',
    'url',
    'utc_time'
]

  params: any;
  componentParent: any;

  constructor(private optionsService: OptionsService) {
    let formControls: { [key: string]: AbstractControl; } = this.optionsService.buildFormControls(this.columnsName);
    this.profileForm = new FormGroup(formControls);
  }

  ngOnInit(): void {

  }

  columnsToUpdate(): void {
    const fields = this.optionsService.buildColumnsFromForm(this.profileForm);
    console.log(fields);
  }

}
