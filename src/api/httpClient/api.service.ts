import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { baseUri } from "../uri/uri.api";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    get(endPoint: string): Observable<any> {
        return this.http.get(`${baseUri}${endPoint}`)
    }

    post(endPoint: string, data: any): Observable<any> {
        return this.http.post(`${baseUri}${endPoint}`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    patch(endPoint: string, data: any): Observable<any> {
        return this.http.patch(`${baseUri}${endPoint}`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    delete(endPoint: string): Observable<any> {
        return this.http.delete(`${baseUri}${endPoint}`)
    }
}