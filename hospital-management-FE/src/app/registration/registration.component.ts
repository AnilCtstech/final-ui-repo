import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpRegistrationService } from '../emp-registration.service';
import { ToasterNotificationService } from '../toaster-notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: EmpRegistrationService,private toaster:ToasterNotificationService) {
    console.log(this.maxDate);
  }
  load : boolean = false;
  firstNameInput: any;
  lastNameInput: any;
  dob: any;
  contact: any;
  email: any;
  role: any;
  date = new Date();
  maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  ngOnInit(): void {
  }

  dateChange(event) {
    console.log(event);
  }
  reloadPage() {
    window.location.reload();
  }

  onSave(event) {
    this.load = true;
    let ftitle = ((document.getElementById("titleid") as HTMLInputElement).value);
    let fName = ((document.getElementById("firstName") as HTMLInputElement).value);
    let lName = ((document.getElementById("lastName") as HTMLInputElement).value);
    let idob = ((document.getElementById("dob") as HTMLInputElement).value);
    let icontact = ((document.getElementById("contact") as HTMLInputElement).value);
    let iemail = ((document.getElementById("email") as HTMLInputElement).value);
    let role1 = (document.getElementById("admin") as HTMLInputElement);
    let role2 = (document.getElementById("physician") as HTMLInputElement);
    let role3 = (document.getElementById("nurse") as HTMLInputElement);
    let irole = "off";

    if (role1.checked) {
      irole = role1.value;
    } else if (role2.checked) {
      irole = role2.value;
    } else if (role3.checked) {
      irole = role3.value;
    }



    let empObj = {
      title: ftitle,
      firstName: fName,
      lastName: lName,
      dateOfBirth: idob,
      contactNo: icontact,
      email: iemail,
      role: irole
    };

    console.log("Employee Object :: " + JSON.stringify(empObj));

    this.registrationService.registerPatient(empObj).subscribe(data => {
     this.toaster.showSuccess("Employee Registration Successful","success");  
     this.load = false;
     
    })
  }

}
