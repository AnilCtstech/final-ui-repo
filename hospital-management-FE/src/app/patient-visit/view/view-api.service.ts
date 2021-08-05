import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Diagnosis, DiagnosisAdapter } from 'src/app/models/diagnosis-model';
import { Medication, MedicationAdapter } from 'src/app/models/medication-model';
import { Procedure, ProcedureAdapter } from 'src/app/models/procedure-model';
import { VitalSign, VitalSignAdapter } from 'src/app/models/vital-signs-model';

@Injectable({
  providedIn: 'root'
})
export class ViewApiService {
  
  constructor(private httpClient:HttpClient,private diagnosisAdapter:DiagnosisAdapter,private procedureAdapter:ProcedureAdapter,private medicationAdapter:MedicationAdapter,
    private vitalSignsAdapter:VitalSignAdapter) { }
 
  private diagnosisUrl='http://localhost:8090';
  private procedureUrl='http://localhost:8087';
  private medicationUrl='http://localhost:8085';
  private vitalsignsUrl='http://localhost:8086';


  getAllDiagnosisForPhysian(): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(this.diagnosisUrl+'/savediagnosis/getall',{})
    .pipe(
      map((data: Diagnosis[]) => {
        return data.map((item) => this.diagnosisAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }
  getAllDiagnosisByPatient(id): Observable<Diagnosis[]> {
    return this.httpClient.get<Diagnosis[]>(this.diagnosisUrl+'/savediagnosis/patients/'+id,{})
    .pipe(
      map((data: Diagnosis[]) => {
        return data.map((item) => this.diagnosisAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }
  
  getAllProcedureByPatient(id): Observable<Procedure[]> {
    return this.httpClient.get<Procedure[]>(this.procedureUrl+'/saveprocedure/patients/'+id,{})
    .pipe(
      map((data: Procedure[]) => {
        return data.map((item) => this.procedureAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }

  getAllMedicationByPatient(id): Observable<Medication[]> {
    return this.httpClient.get<Medication[]>(this.medicationUrl+'/savemedication/patients/'+id,{})
    .pipe(
      map((data: Medication[]) => {
        return data.map((item) => this.medicationAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }

  getAllVitalSignsByPatient(id): Observable<VitalSign[]> {
    return this.httpClient.get<VitalSign[]>(this.vitalsignsUrl+'/vitalsigns/patients/'+id,{})
    .pipe(
      map((data: VitalSign[]) => {
        return data.map((item) => this.vitalSignsAdapter.adapt(item));
      }), catchError(error => {
        return throwError("something went wrong.")
      })
    );
  }





}
