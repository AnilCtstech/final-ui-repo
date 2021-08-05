import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class JwtClientService {


  constructor(private http: HttpClient) { }

  public generateToken(request: any) {
    console.log("In a jwt-client service");
    return this.http.post("http://localhost:8088/authenticate",request,{responseType:'text' as 'json'});
  }

  // public welcome(token:string){
  //   let tokenStr='bearer '+token;
  //   const headers=new HttpHeaders().set("Auhorization",tokenStr)
  //   return this.http.get("http://localhost:8080/",{headers,responseType:'text' as 'json'});
  // }
}
