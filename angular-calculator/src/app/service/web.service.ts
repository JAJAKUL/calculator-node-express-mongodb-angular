import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  apiUrl = 'http://localhost:8080/api/calculator';
  constructor(private httpClient: HttpClient,) { }
  error(error: HttpErrorResponse) {
    let errorMessage;
    let obj = {};
    if (error.error instanceof ErrorEvent) {
      obj = {
        message: error.error,
        status: error.status,
      };
      errorMessage = obj;
    } else {
      obj = {
        message: error.error,
        status: error.status,
      };
      errorMessage = obj;
    }
    return throwError(errorMessage);
  }
  getservice(): Observable<any> {
    const API_URL = `${this.apiUrl}/getall`;
    return this.httpClient.get(API_URL)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
  calculation(data: any): Observable<any> {
    const API_URL = `${this.apiUrl}/calculate`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        map(res => {
          return res;
        }),
        retry(1),
        catchError(this.error)
      );
  }
}
