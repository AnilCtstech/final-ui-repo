import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Medication, MedicationAdapter } from '../models/medication-model';

@Injectable({
  providedIn: 'root'
})
export class MedicationApiService {

  private baseUrl='http://localhost:8085';
  constructor(private httpClient:HttpClient,private medicationAdapter:MedicationAdapter) { }
  
  getAllMedicationsById(searchText: string): Observable<Medication[]> {
    console.log("Inside api service.")
    return this.httpClient.get<Medication[]>(this.baseUrl+'/medication/drugId/'+searchText,{})
      .pipe(
        map((data: Medication[]) => {
          return data.map((item) => this.medicationAdapter.adapt(item)).slice(0,10);
        }), catchError(error => {
          return throwError("something went wrong.")
        })
      );
}

getAllMedicationByDrugname(searchText: String): Observable<Medication[]> {
    return this.httpClient.get<Medication[]>(this.baseUrl+'/medication/drugName'+searchText,{} )
    .pipe(
      map((data: Medication[]) => {
        return data.map((item) => this.medicationAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }

saveMedication(procedures: any): Observable<string> {

    return this.httpClient.post<string>(this.baseUrl+"/savemedication/create", procedures, {responseType:'text' as 'json' });

  } 
}
