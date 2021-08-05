  
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Profile } from 'src/app/models/profile-model';
import { PatientProfile } from 'src/app/models/patient-profile-model';


@Component({
  selector: 'app-physician-appointment',
  templateUrl: './physician-appointment.component.html',
  styleUrls: ['./physician-appointment.component.css']
})
export class PhysianAppointmentComponent implements OnInit, AfterViewInit, AfterViewChecked {

  profiles : Profile[];
  profiles1 : PatientProfile[];
  profile2: PatientProfile[];
  profile3: Profile[];
  constructor(private apiService:AppointmentService) {
    //console.log(this.maxDate);
    this.profiles = [];
    this.profiles1 = [];
    this.profile2 = [];
    this.profile3 = [];
   }

   physicianName : any;
   employeeID : any;
   meetTitle : any;   
   descriptiveInfo : any;
   doa : any;
   slotsAvail : any;
   patientEmail : any;
   title : any;
   fName : any;
   lName : any;
   email : any;
   DOB : any;
   age : any;
   gender : any;
   contact : any;
   hAddress : any;
   race : any;
   ethnicity : any;
   meetTitile1 : any;

  //maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  @ViewChild('customForm1') someInput!: ElementRef;
  @ViewChild('f') userFrm!: NgForm;

  ngOnInit(): void {
    console.log(this.userFrm)
   this.apiService.getAllEmployeeByName("p").subscribe(
              data => {​​​​ 
                  this.profiles=data;
                  console.log(this.profiles);   
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​);  
      this.apiService.getAllPatient().subscribe(
              data1 => {​​​​ 
                  this.profiles1=data1;
                  console.log(this.profiles1);   
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​);   
  }

  ngAfterViewInit(): void {
    console.log("step2")
    // this.userFrm.form.markAsPristine();

  }

  ngAfterViewChecked(): void {
    console.log("step3")
    //this.userFrm.form.markAsPristine();

  }

  dateChange(event) {
    console.log(event);
  }
  reloadPage() {
    window.location.reload();
  }

  changeEmployeeInfo(event){
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
    this.apiService.getEmployeeByName(inputValue).subscribe(
              data1 => {​​​​ 
                  //this.profile3=data1;
                  //console.log(this.profile3);  
                  let tempData = JSON.parse(data1)[0];
                  console.log("tempdata"+tempData);

                  this.employeeID = tempData["id"];
                  this.meetTitile1 = tempData["firstName"] + " " + tempData["lastName"];
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​); 
      //this.meetTitile1 = this.physicianName;
           
  };

  changePatientInfo(event){
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
    this.apiService.getPatientByEmail(inputValue).subscribe(
              data2 => {​​​​ 
                  //this.profile2=data2;
                  //console.log(this.profile2);   
                  let tempData = JSON.parse(data2)[0];
                  console.log("tempdata"+tempData);

                  this.title = tempData["title"];
                  this.fName = tempData["firstName"];
                  this.lName = tempData["lastName"];
                  this.email = tempData["email"];
                  this.gender = tempData["gender"];
                  this.DOB = tempData["dateOfBirth"];
                  this.contact = tempData["contactNo"];
                  this.race = tempData["race"];
                  this.ethnicity = tempData["ethnicity"];
                  this.hAddress = tempData["homeAddress"];

                  this.meetTitle = this.title + "." + this.fName + " " + this.lName + " Appointment with Dr." + this.physicianName;
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​); 
      
  }

  onSave(event) {   
    
    let formData = this.userFrm.value;
    let phyName = formData["physicianName"];
    let empId = formData["employeeID"];
    let mTitle = formData["meetTitle"];
    let descInfo = formData["descriptiveInfo"];
    let doa = formData["doa"];
    let availSlots = formData["slotsAvail"];
    let patName = formData["patientEmail"];
    let pTitle = formData["title"];
    let firstName = formData["fname"];
    let lastName = formData["lname"];
    let pEmail = formData["email"];
    let dob = formData["DOB"];
    let pAge = formData["age"];
    let pGender = formData["gender"];
    let pContact = formData["contact"];
    let pAddress = formData["hAddress"];
    let pRace = formData["race"];
    let pEthnicity = formData["ethnicity"];

    let appointmentObj = {
      phyName: phyName,
      eID: empId,
      meetingTitle: mTitle,
      descriptInfo: descInfo,
      aDate: doa,
      slotsAvail: availSlots,
      patientEmail: patName,
      title: pTitle,
      fName: firstName,
      lName: lastName,
      email : pEmail,
      DOB : dob,
      age : pAge,
      gender : pGender,
      contact : pContact,
      hAddress: pAddress,
      race : pRace,
      ethnicity : pEthnicity

    };

    alert("Appointment OBJ " + JSON.stringify(appointmentObj));

  }

  
}
