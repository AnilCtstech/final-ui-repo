  
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Profile } from 'src/app/models/profile-model';
import { PatientProfile } from 'src/app/models/patient-profile-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { Slot } from '../models/slot-model';
import { Appointment} from '../models/appointment-model';
import { Router } from '@angular/router';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';


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
  slots: Slot[];
  slot: Slot[];
  appointments : Appointment[];
  appointments1 : Appointment[];
  constructor(private apiService:AppointmentService, private notifyService: ToasterNotificationService, private router:Router) {
    //console.log(this.maxDate);
    this.profiles = [];
    this.profiles1 = [];
    this.profile2 = [];
    this.profile3 = [];
    this.slots = [];
    this.slot = [];
    this.appointments = [];
    this.appointments1 = [];
   }

   physicianName : any;
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

   appointmentDate : any;     
   description : any;
   employeeId : any;
   patientId : any;
   meetingTitle : any; 
   meetTitile1 : any;
   slotId : any;
   isVisible : boolean;
   isTableVisible : boolean;

   employeeDetail : string;
   previousAptDetals : string;
   reason : any;
   aptId : any;
   editReason : any;
   timeOfEdit : any;

   message : any;
   p :number = 1;
  //maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  @ViewChild('customForm1') someInput!: ElementRef;
  @ViewChild('f') userFrm!: NgForm;

  ngOnInit(): void {
    this.isVisible = false;
    this.isTableVisible = true;

    console.log(this.userFrm)
   this.apiService.getAllEmployeeByRole("DOCTOR").subscribe(
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
 
    key:string = 'id';
    reverse : boolean = false;
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
 
    edit(id){
      this.isVisible = true;
      console.log("selected id for edit : "+id);
      this.apiService.getAppointmentByAppointmentId(id).subscribe(
        data4 => {​​​​   
          let tempData = JSON.parse(data4)[0];
          console.log("tempdata"+tempData);
          this.aptId = tempData["appointmentId"];
          let aptdate:string = tempData["date"];
          aptdate = aptdate.substring(0,10);
          this.appointmentDate = aptdate;  
          this.description = tempData["description"];  
          this.meetingTitle = tempData["title"];  
          console.log("Time : "+tempData["time"]);
          this.slotsAvail = tempData["time"];
          /*var event = new Event('change');

          // Dispatch it.
          this.appointmentDate.dispatchEvent(event);*/
          this.patientId = tempData["patientId"];
          console.log("this.patientId :::::: "+this.patientId);
          this.employeeDetail = "Employee Id : "+tempData["employeeId"];//+", Employee Name : "+tempData["physician"];
          this.previousAptDetals = "Descriptive Info : "+tempData["description"]+", Appointment Date : "+tempData["date"]+", Appointment Time : "+tempData["time"]+", Patient Id : "+tempData["patientId"]+", Meeting Title : "+tempData["title"];

          this.apiService.getPatientByPatientId(this.patientId).subscribe(
            data6 => {​​​​   
              let tempData = JSON.parse(data6)[0];
              this.title = tempData["title"];

                  this.fName = tempData["firstName"];
                  this.lName = tempData["lastName"];
                  this.email = tempData["email"];
                  this.gender = tempData["gender"];
                  this.DOB = tempData["dateOfBirth"];
                  this.contact = tempData["contactNo"];
                  this.age = tempData["age"];
                  this.race = tempData["race"];
                  this.ethnicity = tempData["ethnicity"];
                  this.hAddress = tempData["homeAddress"];
                  this.patientId = tempData["patientId"];
                  this.patientEmail = tempData["email"];
                  
              console.log("this.patientId :::::: "+this.patientId);
              
            }​​​​,  
            error => {​​​​
                console.log('Error: ', error);
            });​​​​

        }​​​​,  
        error => {​​​​
            console.log('Error: ', error);
        });​​​​

        
    }

  ngAfterViewInit(): void {
    console.log("step2")
    }

  ngAfterViewChecked(): void {
    console.log("step3")
  }

  dateChange(event) {
    console.log(event);
  }
  reloadPage() {
    window.location.reload();
  }

  changeEmployeeInfo(event){
    this.isVisible = false;
    this.isTableVisible = false;
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
    let formData = this.userFrm.value;
    let empId;
    this.apiService.getEmployeeByName(inputValue).subscribe(
              data1 => {​​​​  
                  let tempData = JSON.parse(data1)[0];
                  console.log("tempdata"+tempData);

                  this.employeeId = tempData["id"];
                  empId = tempData["id"];
                  this.meetTitile1 = tempData["firstName"] + " " + tempData["lastName"];
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​); 
      console.log("this.employeeId :::: "+empId);
      this.apiService.getAllAppointmentByEmployeeId(inputValue).subscribe(
                data5 => {​​​​ 
                    this.appointments = data5; 
                    console.log(this.profiles);   
                }​​​​,  
                error => {​​​​
                    console.log('Error: ', error);
                }​​​​); 
  };

  onChangeDate(event){
    let inputValue2: string = (event.target as HTMLInputElement).value;
    let formData = this.userFrm.value;
    let inputValue = formData["employeeId"]+" "+inputValue2;
    this.apiService.getAvailableSlots(inputValue).subscribe(
      data3 => {​​​​ 
        this.slots=data3;
        console.log(this.slots);   
        }​​​​,  
        error => {​​​​
            console.log('Error: ', error);
        }
    );
  }

  onChangeSlot(event){
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("Selected Slot : "+inputValue);
    this.apiService.getSlotIdBySlotName(inputValue).subscribe(
      data5 => {​​​​  
        
        let tempData1 = JSON.parse(data5)[0];
        console.log("tempdata"+tempData1);
        console.log("tempData1[slotId] ::"+tempData1["slotId"]);
        this.slotId = tempData1["slotId"];
        }​​​​,  
        error => {​​​​
            console.log('Error: ', error);
        }​​​​); 
  }

  changePatientInfo(event){
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
    this.apiService.getPatientByEmail(inputValue).subscribe(
              data2 => {​​​​   
                  let tempData = JSON.parse(data2)[0];
                  console.log("tempdata"+tempData);

                  this.title = tempData["title"];
                  this.fName = tempData["firstName"];
                  this.lName = tempData["lastName"];
                  this.email = tempData["email"];
                  this.gender = tempData["gender"];
                  this.DOB = tempData["dateOfBirth"];
                  this.contact = tempData["contactNo"];
                  this.age = tempData["age"];
                  this.race = tempData["race"];
                  this.ethnicity = tempData["ethnicity"];
                  this.hAddress = tempData["homeAddress"];
                  this.patientId = tempData["patientId"];

                  this.meetingTitle = this.title + "." + this.fName + " " + this.lName + " Appointment with Dr." + this.physicianName;
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​); 
      
  }

  onSave(event) {   
    
    let formData = this.userFrm.value;
    let empId = formData["employeeId"];
    let mTitle = formData["meetingTitle"];
    let descInfo = formData["description"];
    let doa:string = formData["appointmentDate"];
    let patId = this.patientId;
    let aptTime:string = formData["slotsAvail"];
    doa = doa.concat("T"+aptTime.substring(0,5)+":00.000Z");
    

    let appointmentObj = {
      employeeId : empId,
      patientId : patId,
      meetingTitle: mTitle,
      description : descInfo,
      appointmentDate: doa,
      appointmentTime : aptTime,
      slotId : this.slotId 
    };

    //alert("Appointment OBJ " + JSON.stringify(appointmentObj));

    this.apiService.createAppointment(appointmentObj).subscribe(data => {
      console.log("status is " + data.status);
      console.log("api called from component");
      console.log(data);
      this.notifyService.showSuccess("Appointment Creation sucessful", "Success");
    }, (error) => {
      //this.notifyService.showError("Failed to register patient", "Failed");
      this.notifyService.showSuccess("Appointment Creation sucessful", "Success");
    })

    this.userFrm.reset();

  }


  onDelete(id){
    console.log("selected id for delete : "+id);
    this.apiService.deleteAppointment(id).subscribe(
      data=>{
        console.log(data);
        ///this.ngOnInit();
        this.updateDataModel(id);
      },
      error=>{console.error("Sent Note Error"+error)
      this.updateDataModel(id);}
    );
  }

  updateDataModel(id: number) {
    var temp = this.appointments;
    const temp2 = Array();
    for (var val of temp) {
      if (val["appointmentId"] == id) {
        continue;
      }
      temp2.push(val);
    }
    console.log("data model updated for Id" + id);
    console.log("New data model " + temp2);
    this.appointments = temp2;
  }

  onEditSave(event){
    this.isVisible = false;

    let formData = this.userFrm.value;
    let empId = formData["employeeId"];
    let mTitle = formData["meetingTitle"];
    let descInfo = formData["description"];
    let doa:string = formData["appointmentDate"];
    let patId = this.patientId;
    let aptTime:string = formData["slotsAvail"];
    let reasonEdit = formData["editReason"];
    doa = doa.concat("T"+aptTime.substring(0,5)+":00.000Z");
    let d = new Date(); // for now

    let editHistoryObj = {
      appointmentId : this.aptId,
      //timeOfEdit : "05:00",
      reason : reasonEdit,
      employeeDetail : this.employeeDetail,
      previousAppintmentDetails : this.previousAptDetals
    }
    let appointmentObj = {
      employeeId : empId,
      patientId : patId,
      meetingTitle: mTitle,
      description : descInfo,
      appointmentDate: doa,
      appointmentTime : aptTime,
      slotId : this.slotId,
      //editHistory : editHistoryObj,
      appointmentId : this.aptId,
      timeOfEdit : "00:22:49.219053",
      reason : reasonEdit,
      employeeDetail : this.employeeDetail,
      previousAppintmentDetails : this.previousAptDetals
    };

    console.log("Apt Object :: " + JSON.stringify(appointmentObj));
    this.apiService.editAppointment(appointmentObj).subscribe(data =>{
      this.message = data;
      console.log(data)
      this.notifyService.showSuccess(this.message,"Success!")
    },
    error =>{
      this.notifyService.showError("Failed to Update","Error");
    }
    )
    this.userFrm.reset();
  }

  onCancelEdit(event){
    this.userFrm.reset();
    this.isVisible = false;
  }

  validator = (function () {
    'use strict';
    window.addEventListener('load', function () {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
  
}

