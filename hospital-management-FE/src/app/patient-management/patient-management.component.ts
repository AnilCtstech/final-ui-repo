import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { PatientDetails } from '../patient-details';
import { PatientManageService } from '../patient-manage.service';
import { ToasterNotificationService } from '../toaster-notification.service';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css']
})
export class PatientManagementComponent implements OnInit {

   patientDetails : any
   firstName : any;
   p :number = 1;
   
  message : any;
   statusToUpdate = {
     patientId : 0,
     firstName : "",
     email : "",
     status : ""
   };
  
  constructor(private patientManageService : PatientManageService,
    private notify : ToasterNotificationService,
    private router:Router,) { }

  ngOnInit(): void {
    let res = this.patientManageService.getAllPatients();
    res.subscribe((data : PatientDetails) => {
      this.patientDetails = [data];
      this.patientDetails = JSON.parse(this.patientDetails)
      
    })
    }

    search(){
      if(this.firstName == ""){
        this.ngOnInit();
      }else {
        this.patientDetails = this.patientDetails.filter(res => {
          return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
        }

        )
      }
    }
    key:string = 'id';
    reverse : boolean = false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }

    edit(details){
      this.statusToUpdate = details;
    }

    updateDetails(){
      this.patientManageService.updateDetails(this.statusToUpdate).subscribe(data =>{
        this.message = data;
        console.log(data)
        this.notify.showSuccess(this.message,"Success!")
        this.router.navigate(["/patient/show"])
      },
      error =>{
        this.notify.showError("Failed to Update","Error");
      }
      )
    }

  
  }


