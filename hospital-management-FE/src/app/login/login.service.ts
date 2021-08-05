import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import jwt_decode from "jwt-decode";
import { tokenData } from '../payload';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
 
  tokendata : any;
  name :string;

  isloggedin() {
    let token = localStorage.getItem("jwtToken");
    if (token != '' && token != null && token != undefined) {
      return true
    } else {
      return false
    }


  }

  logout() {
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("sub");
  }

  getDecodedAccessToken<T>(token: string): any {
    try{
        return jwt_decode<T>(token);
    }
    catch(Error){
        return null;
    }
  }
}

