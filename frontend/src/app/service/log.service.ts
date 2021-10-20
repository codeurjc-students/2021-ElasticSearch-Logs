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

    constructor(private httpClient: HttpClient) {

    }

    public search(searchRequest: SearchRequest):Observable<Log[]> {
        return this.httpClient.post<Log[]>(`${this.url}/log/search`,searchRequest);

    }

}