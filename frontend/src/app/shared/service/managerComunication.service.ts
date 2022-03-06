import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerComunicationService {
  colDefs: string[] = [];
  queryFilters: any[][] = [];
  queryJSON: string = '';
  stringToHighlight: string = '';
  fontSize: string = '';
  rangeFilters: string[] = [];

  private colDefsSubject = new Subject<string[]>();
  colDefsObservable = this.colDefsSubject.asObservable();

  private queryFilterSubject = new Subject<any[][]>();
  queryFilterObservable = this.queryFilterSubject.asObservable();

  private stringToHighlightSubject = new Subject<string>();
  stringToHighlightObservable = this.stringToHighlightSubject.asObservable();

  private fontSizeSubject = new Subject<
    keyof { small: number; normal: number; large: number }
  >();
  fontSizeObservable = this.fontSizeSubject.asObservable();

  private rangeFiltersSubject = new Subject<string[]>();
  rangeFiltersObservable = this.rangeFiltersSubject.asObservable();

  sendColDefs(colDefs: string[]) {
    this.colDefs = colDefs;
    this.colDefsSubject.next(colDefs);
  }

  sendQueryFilters(queryFilters: any[][]) {
    this.queryFilters = queryFilters;
    this.queryFilterSubject.next(queryFilters);
  }

  sendStringToHighlight(stringToHighlight: string) {
    this.stringToHighlight = stringToHighlight;
    this.stringToHighlightSubject.next(stringToHighlight);
  }

  sendFontSize(
    fontSize: keyof { small: number; normal: number; large: number }
  ) {
    this.fontSize = fontSize;
    this.fontSizeSubject.next(fontSize);
  }

  sendRangeFilters(rangeFilters: string[]) {
    this.rangeFilters = rangeFilters;
    this.rangeFiltersSubject.next(rangeFilters);
  }
}
