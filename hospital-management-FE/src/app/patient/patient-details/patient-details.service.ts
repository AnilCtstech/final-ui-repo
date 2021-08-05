import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {
  baseURL: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }


  registerPatientDetails(patientDemographics: any): Observable<any> {


    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    const body = JSON.stringify(patientDemographics);
    console.log("Inside parent api calling method");
    console.log(body);

    return this.http.put(this.baseURL + 'user/update/patient', body, { headers, responseType: 'text' as 'json' })
  }

  getAllergyDetailsById(allergyId: any): Observable<any> {


    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    //const body=JSON.stringify(patientDemographics);
    console.log("Inside get alergy detials by id api ");
    //console.log(body);
    let url: string = "allergy/details/".concat(allergyId);
    //+ encodeURIComponent(allergyId);
    console.log("first"+url);
    //url = url.toString().replace('%20',' ');
    console.log("url before sent" + url);
    
    return this.http.get(this.baseURL + url, { headers, responseType: 'text' as 'json' })
  }

  getAllergyDetailsByType(allergyType: any): Observable<any> {


    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    //const body=JSON.stringify(patientDemographics);
    console.log("Inside get alergy detials by Allergy Type api ");
    //console.log(body);
    let url: string = "allergy/".concat(allergyType);
    //+ encodeURIComponent(allergyId);
    console.log("first"+url);
    //url = url.toString().replace('%20',' ');
    console.log("url before sent" + url);
    
    return this.http.get(this.baseURL + url, { headers, responseType: 'text' as 'json' })
  }


  getAllAllergyTypes(): Observable<any> {


    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    //const body=JSON.stringify(patientDemographics);
    console.log("Inside geting all allergytypes api ");
    //console.log(body);
    let url: string = "allergy/getAllAllergyTypes";
    //+ encodeURIComponent(allergyId);
    console.log("first"+url);
    //url = url.toString().replace('%20',' ');
    console.log("url before sent" + url);
    
    return this.http.get(this.baseURL + url, { headers, responseType: 'text' as 'json' })
  }




  getAllergyIdByName(allergyName: any): Observable<any> {


    const headers = {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token'
    }
    //const body=JSON.stringify(patientDemographics);
    console.log("Inside get alergy detials by Allergy Type api ");
    //console.log(body);
    let url: string = "allergy/detail/".concat(allergyName);
    //+ encodeURIComponent(allergyId);
    console.log("first"+url);
    //url = url.toString().replace('%20',' ');
    console.log("url before sent" + url);
    
    return this.http.get(this.baseURL + url, { headers, responseType: 'text' as 'json' })
  }
  






}
