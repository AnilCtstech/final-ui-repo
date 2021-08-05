import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { Diagnosis } from 'src/app/models/diagnosis-model';
import { ProcedureAdapter } from 'src/app/models/procedure-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { DiagnosisApiService } from '../diagnosis-api.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  @Input() patientId;
  isDepricated;
  submitCount=0;
  diagnoses:any;
  diagnosis:Diagnosis[];
  diagnosis1:any=[];
  index;
  constructor(private diagnosisApiService:DiagnosisApiService,private diagnosisAdapter:ProcedureAdapter,
    private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
    console.log("NG on init")
  }

  resultCodeFormatValue(value: any) {            
    return value.diagnosisCode;
  } 
  
  inputCodeFormatValue(value: any)   {
    if(value.diagnosisCode){
      return value.diagnosisCode;}
    return value;
  }
  
  searchCode= (text$: Observable<string>) =>  text$.pipe( 
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    switchMap((searchText)=>this.diagnosisApiService.getAllDiagnosisByCode(searchText)),
  );

  resultDescriptionFormatValue(value: any) {            
    return value.diagnosisDescription;
  } 
  
inputDescriptionFormatValue(value: any){
    if(value.diagnosisDescription)
      return value.diagnosisDescription;
    return value;
  }
  
searchDescription= (text$: Observable<string>) =>  text$.pipe( 
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    switchMap((searchText)=>this.diagnosisApiService.getAllDiagnosisByDescription(searchText))
  )

  addDiagnoses(){
    this.diagnoses=this.diagnosis
    this.diagnoses.patientId=this.patientId;
    this.diagnoses.diagnosisIsdeprecated=this.isDepricated;
    this.diagnosis1.push(this.diagnoses);
    this.index=this.diagnosis1.length;
  }

  removeDiagnoses(index){
    console.log(index)
    this.diagnosis1.splice(index,1);
  }

  removeAllDiagnosis(){
    
  }
  onSubmit(){
    this.diagnosisApiService.saveDiagnosis(this.diagnosis1).subscribe(
       data => {​​​​ 
             this.notifyService.showSuccess(data,"Dignosis saved!");
             this.diagnosis1=this.diagnosis1.slice(0,this.diagnosis1.length);  
             //this.submitCount=this.submitCount+1;
             //location.reload();
           }​​​​,  
       error => {​​​​
               this.notifyService.showError(error,"Failed to save dignosis!");
           }​​​​
    );
   }
       
}
