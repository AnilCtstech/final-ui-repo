import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Diagnosis, DiagnosisAdapter } from '../models/diagnosis-model';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisApiService { 
  private baseUrl='http://localhost:8090';
  constructor(private httpClient:HttpClient,private diagnosisAdapter:DiagnosisAdapter) { }
  
  getAllDiagnosisByCode(searchText: string): Observable<Diagnosis[]> {
    console.log("Inside api service.")
    return this.httpClient.get<Diagnosis[]>(this.baseUrl+'/diagnosis/getAllDiagnosisCode/'+searchText,{})
      .pipe(
        map((data: Diagnosis[]) => {
          return data.map((item) => this.diagnosisAdapter.adapt(item)).slice(0,10);
        }), catchError(error => {
          return throwError("something went wrong.")
        })
      );
}

getAllDiagnosisByDescription(searchText: String): Observable<Diagnosis[]> {
    return this.httpClient.post<Diagnosis[]>(this.baseUrl+'/diagnosis/getAllDiagnosisDescription/'+searchText,{})
    .pipe(
      map((data: Diagnosis[]) => {
        return data.map((item) => this.diagnosisAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }

  saveDiagnosis(diagnosis: any): Observable<string> {

    return this.httpClient.post<string>(this.baseUrl+"/savediagnosis/create", diagnosis, {responseType:'text' as 'json' });

  }

}
