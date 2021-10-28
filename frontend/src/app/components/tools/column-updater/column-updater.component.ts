import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-column-updater',
  templateUrl: './column-updater.component.html',
  styleUrls: ['./column-updater.component.css']
})
export class ColumnUpdaterComponent implements OnInit {

  public profileForm: FormGroup;

  params: any;
  componentParent: any;

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

  constructor() {
    let formControls: { [key: string]: AbstractControl; } = this.buildFormControls();
    this.profileForm = new FormGroup(formControls);
  }

  ngOnInit(): void {
  }

  /**
  * Build the form controls for the form group
  * @returns An object with the form controls
  */
  buildFormControls(): { [key: string]: AbstractControl; } {
    let formControls = {}
    this.columnsName.map((name): any => {
      Object.assign(formControls, { [name]: new FormControl(false) })
    })

    return formControls;
  }

  /**
   * Build an array of String with the columns name to build dynamically columns later
   * @returns An array with the columns name
   */
  buildColumnsFromForm(): string[] {
    const formDataKeys: string[] = Object.keys(this.profileForm.value);
    const formDataValues: boolean[] = Object.values(this.profileForm.value);

    let newColumnsName: string[] = []

    for (let i = 0; i < formDataKeys.length; i++) {
      const key = formDataKeys[i];
      const value = formDataValues[i];

      if (value)
        newColumnsName.push(key);
    }

    return newColumnsName;
  }

  columnsToUpdate(): void {
    const fields = this.buildColumnsFromForm();
    console.log(fields);
  }

}
