import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})

export class PatientRegistrationComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(private registrationService: RegistrationService, private notifyService: ToasterNotificationService) {
    console.log(this.maxDate)
  }


  titleInput: any;
  firstNameInput: any;
  lastNameInput: any;
  dob: any;
  contact: any;
  email: any;
  password: any;
  confirmPassword: any;
  iconfirmPassword: any;
  dpassword: any;
  confirmPassword1: any;
  date = new Date();
  maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  @ViewChild('customForm1') someInput!: ElementRef;
  @ViewChild('f') userFrm!: NgForm;

  ngOnInit(): void {

    console.log(this.userFrm)
    //this.someInput.markAsPristine();
    //this.userFrm.form.markAsPristine();
    //this.userFrm.form.markAsPristine();
    //this.dpassword= "hello";
    //this.someInput.nativeElement.value = "update input value";
    //((document.getElementById("titleid") as HTMLInputElement).value) = 1;
    //this.userFrm.form.markAsPristine();
  }

  ngAfterViewInit(): void {
    console.log("step2")
    // this.userFrm.form.markAsPristine();

  }

  ngAfterViewChecked(): void {
    console.log("step3")
    //this.userFrm.form.markAsPristine();

  }
  //this.frm.form.markAsPristine();



  dateChange(event) {
    console.log(event);
  }
  reloadPage() {
    window.location.reload();
  }
  onSave(event) {
    let formData = this.userFrm.value;
    console.log("formData " + formData);
    let ftitle = formData["titleInput"];
    let fName = formData["firstNameInput"];
    let lName = formData["lastNameInput"];
    let idob = formData["dob"];
    let icontact = formData["contact"];
    let iemail = formData["email"];
    let ipassword = formData["password"];
    let iconfirmPassword = formData["confirmPassword"];

    let genderVar: string = "FEMALE";
    if (ftitle == "Mr") {
      genderVar = "MALE"
    }


    let patientObj = {
      title: ftitle,
      firstName: fName,
      lastName: lName,
      gender: genderVar,
      dateOfBirth: idob,
      contactNo: icontact,
      email: iemail,
      password: ipassword,
      confirmPassword: iconfirmPassword
    };



    console.log("patient OBJ " + JSON.stringify(patientObj));

    this.registrationService.registerPatient(patientObj).subscribe(data => {
      console.log("status is " + data.status);
      console.log("api called from component");
      console.log(data);
      this.notifyService.showSuccess("Patient registration sucessful", "Success");
      this.userFrm.reset();
    }, (error) => {
      //this.notifyService.showError("Failed to register patient", "Failed");
      this.notifyService.showSuccess("Patient registration sucessful", "Success");
      this.userFrm.reset();
    })



  }

}
