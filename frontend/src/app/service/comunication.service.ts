import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicationService {
  colDefs: string[] = [];
  queryFilters: any[][] = [];
  queryJSON: string = '';

  private colDefsSubject = new Subject<string[]>();
  colDefsObservable = this.colDefsSubject.asObservable();

  private queryFilterSubject = new Subject<any[][]>();
  queryFilterObservable = this.queryFilterSubject.asObservable();

  sendColDefs(colDefs: string[]) {
    this.colDefs = colDefs;
    this.colDefsSubject.next(colDefs);
  }

  sendQueryFilters(queryFilters: any[][]) {
    this.queryFilters = queryFilters;
    this.queryFilterSubject.next(queryFilters);
  }
}
