import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VitalSign, VitalSignAdapter } from '../models/vital-signs-model';

@Injectable({
  providedIn: 'root'
})
export class VitalSignApiService {

  private baseUrl:string='http://localhost:8086';

  constructor(private httpClient: HttpClient,private vitalAdapter:VitalSignAdapter) { }

  saveVitalSigns(vitalSigns: any): Observable<VitalSign[]> {
     return this.httpClient.post<VitalSign[]>(this.baseUrl+'/vitalsigns/save', vitalSigns, { responseType:'text' as 'json' });
  }

}
