import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-time-shortcuts',
  templateUrl: './time-shortcuts.component.html',
  styleUrls: ['./time-shortcuts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimeShortcutsComponent implements OnInit {

  public date: Date = new Date();

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public shortcuts = [
    {
      name: 'Today',
      date: new Date().setDate(this.date.getDate() - 0),
    },
    {
      name: 'Yesterday',
      date:new Date().setDate(this.date.getDate() - 1),
    },
    {
      name: 'A week ago',
      date:new Date().setDate(this.date.getDate() - 7),
    },
    {
      name: 'A month ago',
      date: new Date().setMonth(this.date.getMonth() - 1),
    },
    {
      name: 'A year ago',
      date: new Date().setFullYear(this.date.getFullYear() - 1),
    }
  ];



  constructor() { }

  ngOnInit(): void {
  }


  private getDate(days: number): number {
    return new Date().setDate(this.date.getDate() - days);
  }
}
