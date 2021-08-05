import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators'
import { PatientProfile, PatientProfileAdapter } from '../models/patient-profile-model';
import { Profile, ProfileAdapter } from '../models/profile-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient:HttpClient,private adapter:ProfileAdapter, private patientAdapter:PatientProfileAdapter) { }

  getAllEmployeeByName(name:String):Observable<Profile[]>{
    /*let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr) */
    return this.httpClient.post<Profile[]>("http://localhost:8080/user/employee/name",name)
                    .pipe(
                      map((data:Profile[])=>{
                        return data.map((item)=>this.adapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );

  }

  getAllPatient():Observable<PatientProfile[]>{
    /*let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)*/
    return this.httpClient.get<PatientProfile[]>("http://localhost:8080/user/patient/all")
                    .pipe(
                      map((data1:PatientProfile[])=>{
                        return data1.map((item)=>this.patientAdapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );

  }
  
  getPatientByEmail(email:any):Observable<any>{

    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    console.log("Inside get Patient By Email api ");
    return this.httpClient.post<PatientProfile>("http://localhost:8080/user/patient/email", email, { responseType: 'text' as 'json' })
   /* return this.httpClient.get<PatientProfile>("http://localhost:8081/user/patient/"+email)
    .pipe(map((data2:PatientProfile)=>{
      return data2.map((item)=>this.patientAdapter.adapt(item));
    }),catchError(error=>{
      return throwError("something went wrong.")
    })
    );   */
    

  }

  getEmployeeByName(name:any):Observable<any>{
    console.log("Inside get emp By name api ");
    return this.httpClient.post<Profile>("http://localhost:8080/user/employee/ename", name, { responseType: 'text' as 'json' })
  }

}
