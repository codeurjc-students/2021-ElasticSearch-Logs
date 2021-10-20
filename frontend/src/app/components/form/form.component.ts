import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Log } from '../../models/log';
import { LogService } from '../../service/log.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  queryFilters = new FormGroup({
    extension: new FormControl('', Validators.required),
    clientip: new FormControl('',Validators.required),
    host: new FormControl('',Validators.required),
    request: new FormControl(''),
    response: new FormControl(''),
    url: new FormControl(''),
  });

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  filter(): void{
    const filtersToApply = this.queryFilters.value;
  }

}
