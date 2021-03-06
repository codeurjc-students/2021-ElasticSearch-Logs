import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchRequest } from './dto';
import { Log } from './model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private url: string = environment.BASE_API_URL;

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param filters An array made of 2 arrays, the first one are the search terms
   * and the second one are the fields. Pass 2 empty arrays to get data without any
   * filter
   * @returns An observable of logs
   */
  public search(
    filters: string[][],
    page: number,
    type: string,
    sortBy?: string,
    order?: string
  ): Observable<any[]> {
    const searchRequest: SearchRequest = {
      fields: filters[0],
      searchTerms: filters[1],
      page,
      size: 10,
      sortBy,
      order,
    };

    return this.httpClient.post<Log[]>(
      `${this.url}/log/${type}-search`,
      searchRequest,
      { withCredentials: true }
    );
  }

  public updateTableState(state: any) {
    const user = localStorage.getItem('logged');
    let currentUser = '';
    if (typeof user === 'string') currentUser = user;

    const updatedState = JSON.stringify({
      user: currentUser,
      state,
    });
    localStorage.setItem(`${currentUser}_column_state`, updatedState);
  }

  public getScale() {
    let rowheight: keyof {
      small: number;
      normal: number;
      large: number;
    } = 'normal';

    switch (localStorage.getItem('rowheight')) {
      case 'small':
        rowheight = 'small';
        break;
      case 'normal':
        rowheight = 'normal';
        break;
      case 'large':
        rowheight = 'large';
        break;
      default:
        rowheight = 'normal';
    }

    return rowheight;
  }
}
