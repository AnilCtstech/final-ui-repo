import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  baseURL: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getPassword(email: string): Observable<any> {
    const headers = {
      'content-type': 'application/json',
    }
    return this.http.get(`${this.baseURL}/forget-password/${email}`, { responseType: 'text' as 'json' });
  }
}
