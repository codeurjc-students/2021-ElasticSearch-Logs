import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Log } from "../models/log";
import { Page } from "../models/page";


@Injectable({
    providedIn: 'root'
})

export class LogService {
    private url: string = environment.BASE_API_URL;

    constructor(private httpClient: HttpClient) {

    }

    public getLogs(extension: string): Observable<Log[]> {
        return this.httpClient.get<Log[]>(`${this.url}/log/extension/${extension}`)
        
    }

}