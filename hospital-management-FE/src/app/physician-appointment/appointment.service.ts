import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators'
import { Appointment } from '../models/appointment-model';
import { PatientProfile, PatientProfileAdapter } from '../models/patient-profile-model';
import { Profile, ProfileAdapter } from '../models/profile-model';
import { Slot, SlotAdapter } from '../models/slot-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient:HttpClient,private adapter:ProfileAdapter, private patientAdapter:PatientProfileAdapter, private slotAdapter:SlotAdapter) { }

  getAllEmployeeByRole(role:String):Observable<Profile[]>{
    return this.httpClient.post<Profile[]>("http://localhost:8080/user/employee/role",role)
                    .pipe(
                      map((data:Profile[])=>{
                        return data.map((item)=>this.adapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );

  }

  getAllPatient():Observable<PatientProfile[]>{
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
      

  }

  getEmployeeByName(name:any):Observable<any>{
    console.log("Inside get emp By name api ");
    return this.httpClient.post<Profile>("http://localhost:8080/user/employee/ename", name, { responseType: 'text' as 'json' })
  }

  getAvailableSlots(idAndDate:any):Observable<Slot[]>{
    console.log("Inside get Available slots : "+idAndDate);
   return this.httpClient.post<Slot[]>("http://localhost:8081/slot/available",idAndDate)
                    .pipe(
                      map((data3:Slot[])=>{
                        return data3.map((item)=>this.slotAdapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );
  }

  createAppointment(appointmentInfo: any): Observable<any> {

    const body = JSON.stringify(appointmentInfo);
    console.log("Inside create Appointment api calling method");
    console.log(body);
    
    let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    
    console.log(headers);
    return this.httpClient.post<string>("http://localhost:8081/appointment/book", appointmentInfo, { headers,responseType:'text' as 'json' })
  }

  getSlotIdBySlotName(slotName : any):Observable<any> {
    return this.httpClient.post<Slot>("http://localhost:8081/slot/slotname",slotName, { responseType: 'text' as 'json' });
  }

  getAllAppointmentByEmployeeId(name : string):Observable<any>{
    console.log("Inside get Appointment By empName api ");
    return this.httpClient.get( 'http://localhost:8081/appointment/physiciansearch/'.concat(name));
  }

  deleteAppointment(id : number):Observable<any>{
    return this.httpClient.delete("http://localhost:8081/appointment/book/"+id);
  }

  getAppointmentByAppointmentId(id : number):Observable<any>{
    return this.httpClient.post<Appointment>("http://localhost:8081/appointment/id/",id, { responseType: 'text' as 'json' });
  }

  getPatientByPatientId(id : number):Observable<any>{
    return this.httpClient.post<PatientProfile>( 'http://localhost:8080/user/patient/id/',id, { responseType: 'text' as 'json' });
  }

  editAppointment(appointmentObj : any):Observable<any>{
    return this.httpClient.put( 'http://localhost:8081/appointment/book/',appointmentObj, { responseType: 'text' as 'json' });
  }

}
