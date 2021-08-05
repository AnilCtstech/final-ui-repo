import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { Procedure, ProcedureAdapter } from 'src/app/models/procedure-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { ProcedureApiService } from '../procedure-api.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {
  @Input() patientId;
  isDepricated;
  index;
  procedure:any;
  procedures:Procedure[];
  procedures1:any=[];
  constructor(private apiService:ApicallService,private procedureApiService:ProcedureApiService,
    private procedureAdapter:ProcedureAdapter,private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
    console.log("NG on init")
  }

  resultCodeFormatValue(value: any) {            
    return value.procedureCode;
  } 
  
  inputCodeFormatValue(value: any)   {
    if(value.procedureCode){
      return value.procedureCode;}
    return value;
  }
  
  searchCode= (text$: Observable<string>) =>  text$.pipe( 
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    switchMap((searchText)=>this.procedureApiService.getAllProceduresByCode(searchText)),
  );

  resultDescriptionFormatValue(value: any) {            
    return value.procedureDescription;
  } 
  
inputDescriptionFormatValue(value: any){
    if(value.procedureDescription)
      return value.procedureDescription;
    return value;
  }
  
searchDescription= (text$: Observable<string>) =>  text$.pipe( 
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 3),
    switchMap((searchText)=>this.procedureApiService.getAllProceduresByDescription(searchText))
  )

  addProcedure(){
    this.procedure=this.procedures
    this.procedure.patientId=this.patientId;
    this.procedure.procedureIsdeprecated=this.isDepricated;
    this.procedures1.push(this.procedure);
    this.index=this.procedures1.length;
  }

  removeProcedure(index){
    console.log(index)
    this.procedures1.splice(index,1);
    }

onSubmit(){
 console.log("proc",this.procedures1);
 
  this.procedureApiService.saveProcedures(this.procedures1).subscribe(
   
   data => {​​​​ 
          this.notifyService.showSuccess(data,"Send Note");
          //location.reload();
        }​​​​,  
    error => {​​​​
            this.notifyService.showError(error,"Send Note");
        }​​​​
 );
  console.log("Saving"+this.procedures1);
}

}
