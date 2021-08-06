import { Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToasterNotificationService } from '../toaster-notification.service';
import { StaffManagementService } from './staff-management.service';
import { Profile } from '../models/profile-model';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {
  

  profile : any
  firstName : any;
  lastName : any;
  p :number = 1;
  
 message : any;
  statusToUpdate = {
    id : 0,
    firstName : "",
    lastName : "",
    email : "",
    dateOfBirth : "",
    role : "",
    status : ""
  };
 
 constructor(private staffManageService : StaffManagementService,
   private notify : ToasterNotificationService,
   private router:Router,) { }  
  

 ngOnInit(): void {
  let res = this.staffManageService.getAllEmployee();
   res.subscribe((data : Profile) => {
     this.profile = [data];
     this.profile = JSON.parse(this.profile)
     
   })
   }

   search(){
     if(this.firstName == ""){
       this.ngOnInit();
     }else {
       this.profile = this.profile.filter(res => {
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
    this.staffManageService.updateDetails(this.statusToUpdate).subscribe(data =>{
       this.message = data;
       console.log(data)
       this.notify.showSuccess(this.message,"Success!")
       this.router.navigate(["/staff/show"])
     },
     error =>{
       this.notify.showError("Failed to Update","Error");
     }
     )
   }
}
