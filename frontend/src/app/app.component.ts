import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Log } from './model/log';
import { LogService } from './service/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public logs: Log[] = [];

  constructor(private logService: LogService) {

  }

  ngOnInit(){
    this.getLogsByExtension();
  }

  public getLogsByExtension(): void {
    this.logService.getLogsByExtension('deb').subscribe(
      (res: Log[]) => {
        this.logs = res;
        console.log(res)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
