import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffManagementService {

  baseURL: string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  getAllEmployee():Observable<any>{

    let token=localStorage.getItem("jwtToken");
     const token1= token?.slice(1,token.length-1);
     let tokenStr='Bearer '+token1;
     console.log(tokenStr);
     const headers = { 
      'content-type': 'application/json',
      'Authorization' : tokenStr
      }  
      return this.http.get(`${this.baseURL}/user//employee/all`,{headers,responseType:'text' as 'json'})
      
  }

  updateDetails(Details : any) :Observable<any> {
 
    const body=JSON.stringify(Details);
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
    return this.http.put(`${this.baseURL}/user/employee/update`, body,{headers,responseType:'text' as 'json'})

  }
}
