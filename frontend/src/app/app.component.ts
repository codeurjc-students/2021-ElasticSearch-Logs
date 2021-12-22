import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  loading: boolean;

  constructor() {
    this.loading = true;
  }
  ngAfterViewChecked(): void {
    this.loading = false;
  }

  ngOnInit() {}
}
