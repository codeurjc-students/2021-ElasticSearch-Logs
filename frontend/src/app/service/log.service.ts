import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Log } from '../models/log';
import { SearchRequest } from '../models/searchRequest';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private url: string = environment.BASE_API_URL;

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param filters An array made of 2 arrays, the first one are the search terms
   * and the second one are the fields. Pass 2 empty arrays to get data without any
   * filter
   * @returns
   */
  public search(filters: any, page: number): Observable<any[]> {
    const searchRequest: SearchRequest = {
      // fields: filters[0],
      fields: ['message'],
      searchTerms: filters[1],
      page: page,
      size: 10,
    };

    return this.httpClient.post<Log[]>(
      `${this.url}/log/term-search`,
      searchRequest
    );
  }
}
