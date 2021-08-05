import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PatientProfile, PatientProfileAdapter } from './models/patient-profile-model';
import { Profile, ProfileAdapter } from './models/profile-model';


@Injectable({
  providedIn: 'root'
})
export class PatientManageService {

  baseURL: string = "http://localhost:8080";

  constructor(private http:HttpClient,private patientProfileAdapter:PatientProfileAdapter,private profileAdapter:ProfileAdapter) { }

  getAllPatients():Observable<any>{

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
      return this.http.get(`${this.baseURL}/user/patient/getall`,{headers,responseType:'text' as 'json'})
      
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
    return this.http.put(`${this.baseURL}/user/patient/update`, body,{headers,responseType:'text' as 'json'})

  }

  getAllPatientsForVisit(): Observable<PatientProfile[]> {
    return this.http.get<PatientProfile[]>(this.baseURL+'/user/patient/visit/profile',{})
    .pipe(
      map((data: PatientProfile[]) => {
        return data.map((item) => this.patientProfileAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }
  getPatientProfileByName(name): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.baseURL+'/user/patient/profile/'+name,{})
    .pipe(
      map((data: Profile[]) => {
        return data.map((item) => this.profileAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }
}
