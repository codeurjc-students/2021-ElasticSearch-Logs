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

    private columnsName: string[] = [
        'timestamp',
        'message',
        'agent',
        'clientip',
        'event',
        'host',
        'request',
        'response',
        'url',
        'bytes',
        'extension',
        'geo',
        'index',
        'ip',
        'ip_range',
        'machine',
        'memory',
        'message',
        'phpmemory',
        'referer',
        'tags',
        'timestamp_range',
        'utc_time'
      ]
    constructor(private httpClient: HttpClient) {

    }

    getColDefNames():string[]{
        return this.columnsName;
    }


    public search(searchRequest: SearchRequest):Observable<Log[]> {
        return this.httpClient.post<Log[]>(`${this.url}/log/search`,searchRequest);

    }

}