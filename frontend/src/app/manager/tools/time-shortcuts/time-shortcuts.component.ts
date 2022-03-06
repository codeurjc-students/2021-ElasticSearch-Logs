import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { number } from 'echarts';
import { ManagerComunicationService } from 'src/app/shared/service/managerComunication.service';
import { Log } from 'src/app/table/model';
import { LogService } from 'src/app/table/table.service';

@Component({
  selector: 'app-time-shortcuts',
  templateUrl: './time-shortcuts.component.html',
  styleUrls: ['./time-shortcuts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TimeShortcutsComponent implements OnInit {
  public date: Date = new Date();

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public shortcuts = [
    {
      name: '30 minutes ago',
      date: new Date().setMinutes(this.date.getMinutes() - 30),
    },
    {
      name: '1 hour ago',
      date: new Date().setHours(this.date.getHours() - 1),
    },
    {
      name: '6 hours ago',
      date: new Date().setHours(this.date.getHours() - 6),
    },
    {
      name: '1 day ago',
      date: new Date().setDate(this.date.getDate() - 1),
    },
    {
      name: '1 week ago',
      date: new Date().setDate(this.date.getDate() - 7),
    },
  ];

  constructor(private managerComunicationService: ManagerComunicationService) {}

  ngOnInit(): void {}

  private getDate(days: number): number {
    return new Date().setDate(this.date.getDate() - days);
  }

  onShorcutCall(dateNumber: number) {
    const from = new Date(dateNumber).toISOString().replace('Z', '+00:00');
    const to = new Date().toISOString().replace('Z', '+00:00');

    this.managerComunicationService.sendRangeFilters([from, to]);
  }
}
