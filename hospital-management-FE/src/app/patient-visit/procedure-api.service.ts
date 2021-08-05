import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Procedure, ProcedureAdapter } from '../models/procedure-model';

@Injectable({
  providedIn: 'root'
})
export class ProcedureApiService {

  private baseUrl='http://localhost:8087';
  constructor(private httpClient:HttpClient,private procedureAdapter:ProcedureAdapter) { }
  
  getAllProceduresByCode(searchText: string): Observable<Procedure[]> {
    console.log("Inside api service.")
    return this.httpClient.get<Procedure[]>(this.baseUrl+'/procedure/getAllProcedureCode/'+searchText,{})
      .pipe(
        map((data: Procedure[]) => {
          return data.map((item) => this.procedureAdapter.adapt(item)).slice(0,10);
        }), catchError(error => {
          return throwError("something went wrong.")
        })
      );
}

getAllProceduresByDescription(searchText: String): Observable<Procedure[]> {
    return this.httpClient.get<Procedure[]>(this.baseUrl+'/procedure/getAllProcedureDescription/'+searchText,{} )
    .pipe(
      map((data: Procedure[]) => {
        return data.map((item) => this.procedureAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }

saveProcedures(procedures: any): Observable<string> {

    return this.httpClient.post<string>(this.baseUrl+"/saveprocedure/create", procedures, {responseType:'text' as 'json' });

  } 
}
