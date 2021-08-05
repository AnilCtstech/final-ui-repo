import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  baseURL: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  updatePassword(ChangePasswordObj : any) :Observable<any> {
 
    const body=JSON.stringify(ChangePasswordObj);
    console.log(body);
     let token=localStorage.getItem("jwtToken");
     const token1= token?.slice(1,token.length-1);
     let tokenStr='Bearer '+token1;
     console.log(tokenStr);
     const headers = { 
      'content-type': 'application/json',
      'Authorization' : tokenStr
      // 'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods':' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':' Origin, Content-Type, X-Auth-Token'
      }  
    return this.http.put(`${this.baseURL}/change-password`, body,{headers,responseType:'text' as 'json'})

  }
}
