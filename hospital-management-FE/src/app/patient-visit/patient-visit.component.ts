import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApicallService } from '../apicall.service';
import { Profile } from '../models/profile-model';
import { PatientManageService } from '../patient-manage.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {

  patientId:number;
  public profile: Profile;

  patient:any;
  
  constructor(private apiService:ApicallService,private patientManageService:PatientManageService) { }

  ngOnInit(): void {
 
  }

  resultFullNameValue(value: any) {           
    return value.firstName +' '+value.lastName;
  } 
  
  inputFullNameValue(value: any)   {
    if(value.firstName)
      return value.firstName +' '+value.lastName
    return value;
  }
  
  searchName= (text$: Observable<string>) =>  text$.pipe( 
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    switchMap((searchText)=>this.patientManageService.getPatientProfileByName(searchText)),
  );

   extractPatientId(event:any){
    this.profile=event;
    if(this.profile){
      this.patientId=this.profile.id;
    }
   }
}
