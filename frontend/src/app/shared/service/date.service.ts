import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  getEmptyDate(date: Date): Date {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
  }

  mapDateToString(date: Date): string {
    return date.toISOString().slice(0, -5);
  }

  getOneWeekAgo(date: Date): Date {
    const newDate = this.getEmptyDate(new Date());
    newDate.setDate(newDate.getDate() - 7);
    return newDate;
  }
}
