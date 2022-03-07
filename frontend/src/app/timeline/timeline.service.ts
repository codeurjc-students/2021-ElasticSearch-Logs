import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeLineService {
  private url: string = environment.BASE_API_URL;

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param filters An array made of 2 arrays, the first one are the search terms
   * and the second one are the fields. Pass 2 empty arrays to get data without any
   * filter
   * @returns An observable of logs
   */
  public getIndices(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.url}/index/all`);
  }
}
