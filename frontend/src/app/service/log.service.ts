import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Log } from "../models/log";
import { SearchRequest } from "../models/searchRequest";


@Injectable({
    providedIn: 'root'
})

export class LogService {

    private url: string = environment.BASE_API_URL;

    private columns: any = {
        'timestamp' : 250,
        'message' : 1000,
        'agent': 700,
        'clientip':150,
        'event':200,
        'host':250,
        'request':350,
        'response':120,
        'url':600,
        'bytes':100,
        'extension':120,
        'geo':150,
        'index':200,
        'ip':150,
        'ip_range':200,
        'machine': 500,
        'memory':150,
        'phpmemory':150,
        'referer':600,
        'tags':150,
        'timestamp_range':250,
        'utc_time':250
      }
    
    constructor(private httpClient: HttpClient) {

    }

    getColDefNames(): string[] {
        return Object.keys(this.columns);
    }

    getColumns(): string[] {
        return this.columns;
    }


    /**
     * 
     * @param filters An array made of 2 arrays, the first one are the search terms
     * and the second one are the fields. Pass 2 empty arrays to get data without any 
     * filter
     * @returns 
     */
    public search(filters: any): Observable<Log[]> {
        const searchRequest: SearchRequest = {
            fields: filters[0],
            searchTerms: filters[1],
            page: 0,
            size: 5000,
        }

        return this.httpClient.post<Log[]>(`${this.url}/log/search`, searchRequest);

    }

}