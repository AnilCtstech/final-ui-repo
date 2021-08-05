import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { Medication, MedicationAdapter } from 'src/app/models/medication-model';
import { Profile } from 'src/app/models/profile-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { MedicationApiService } from '../medication-api.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
  @Input() patientId;
  medications:Medication[];
  index;
  medication:any;
  medications1:any=[];
  constructor(private apiService:ApicallService,private medicationApiService:MedicationApiService,
    private medicationAdapter:MedicationAdapter,private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
  }

  public profile: Profile;

resultFormatBandListValue(value: any) {            
  return value.firstName +' '+value.lastName;
} 

inputFormatBandListValue(value: any)   {
  if(value.firstName)
    return value.firstName +' '+value.lastName
  return value;
}

search= (text$: Observable<string>) =>  text$.pipe( 
  debounceTime(200),
  distinctUntilChanged(),
  filter(term => term.length >= 2),
  switchMap((searchText)=>this.apiService.getAllEmployeeByName(searchText)),
);


resultCodeFormatValue(value: any) {            
  return value.drugId;
} 

inputCodeFormatValue(value: any)   {
  if(value.drugId){
    return value.drugId;}
  return value;
}

searchCode= (text$: Observable<string>) =>  text$.pipe( 
  debounceTime(200),
  distinctUntilChanged(),
  filter(term => term.length >= 2),
  switchMap((searchText)=>this.medicationApiService.getAllMedicationsById(searchText)),
);

resultDrugNameFormatValue(value: any) {            
  return value.drugName;
} 

inputDrugNameFormatValue(value: any){
  if(value.drugName)
    return value.drugName;
  return value;
}

searchDrugName= (text$: Observable<string>) =>  text$.pipe( 
  debounceTime(200),
  distinctUntilChanged(),
  filter(term => term.length >= 3),
  switchMap((searchText)=>this.medicationApiService.getAllMedicationByDrugname(searchText))
)

addMedication(){
  this.medication=this.medications
  this.medication.patientId=this.patientId;
  //this.medication.procedureIsdeprecated=this.isDepricated;
  this.medications1.push(this.medication);
  this.index=this.medications1.length;
}

removeMedication(index){
  console.log(index)
  this.medications1.splice(index,1);
  }

onSubmit(){
this.medicationApiService.saveMedication(this.medications1).subscribe(
  data => {​​​​ 
        this.notifyService.showSuccess(data,"Medications Added!");
        //location.reload();
      }​​​​,  
    error => {​​​​
          this.notifyService.showError(error,"Failed to add Medications!");
        }​​​​
);
}

resultGenericNameFormatValue(value: any) {            
  return value.drugGenericName;
} 

inputGenericNameFormatValue(value: any){
  if(value.drugName)
    return value.drugGenericName;
  return value;
}

searchFilter= (text$: Observable<string>) =>  text$.pipe( 
  debounceTime(200),
  distinctUntilChanged(),
  filter(term => term.length >= 3),
  map(term => this.medications1.slice(0, 10))
)
resultDrugStrengthFormatValue(value: any) {            
  return value.drugStrength;
} 

inputDrugStrengthFormatValue(value: any){
  if(value.drugName)
    return value.drugStrength;
  return value;
}
resultDrugFormFormatValue(value: any) {            
  return value.drugForm;
} 

inputDrugFormFormatValue(value: any){
  if(value.drugName)
    return value.drugForm;
  return value;
}


}
