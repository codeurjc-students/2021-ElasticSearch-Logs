import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableManagerComunicationService {
  rowProperties: object = {} ;


  private rowPropertiesSubject = new Subject<object>();
  rowPropertiesObservable = this.rowPropertiesSubject.asObservable();


  sendRowProperties(rowProperties: object) {
    this.rowProperties = rowProperties;
    this.rowPropertiesSubject.next(rowProperties);
  }

}
