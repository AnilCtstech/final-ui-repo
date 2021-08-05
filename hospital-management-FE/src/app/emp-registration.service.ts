import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpRegistrationService {

  baseURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  registerPatient(empInfo: any): Observable<any> {

    const body = JSON.stringify(empInfo);
    console.log("Inside parent api calling method");
    console.log(body)
    const token = localStorage.getItem("jwtToken");
    const token1 = token?.slice(1, token.length - 1);
    let tokenStr: string = 'Bearer ' + token1;
    console.log(tokenStr);
    //const headers=new HttpHeaders().set("Authorization",tokenStr)
    const headers = {
      'content-type': 'application/json',
      'Authorization': tokenStr
      // 'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods':' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':' Origin, Content-Type, X-Auth-Token'
    }
    console.log(headers);
    return this.http.post(this.baseURL + 'user/employee', body, { 'headers': headers, responseType: 'text' as 'json' })
  }
}
