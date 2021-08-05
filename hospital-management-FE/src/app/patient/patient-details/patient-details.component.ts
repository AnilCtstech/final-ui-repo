import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Allergy } from 'src/app/allergy';
import { AppointmentService } from 'src/app/physician-appointment/appointment.service';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import {PatientDetailsService } from './patient-details.service';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit, AfterViewInit, AfterViewChecked  {

  constructor(private patientDetailsService: PatientDetailsService,private apiService:AppointmentService,private notifyService: ToasterNotificationService) { 
    console.log(this.maxDate)
  }


  @ViewChild('customForm1') someInput!: ElementRef;
  @ViewChild('f') userFrm!: NgForm;

  ngOnInit(): void {
    this.tokenEmail=sessionStorage.getItem("sub");  
    this.emails=this.tokenEmail;
  
    this.apiService.getPatientByEmail(this.emails).subscribe(
              data2 => {​​​​ 
                 
                  let tempData = JSON.parse(data2)[0];
                  console.log("tempdata"+tempData);

                  this.titleInput = tempData["title"];
                  this.firstName = tempData["firstName"];
                  this.lastName = tempData["lastName"];
                  this.emails=this.tokenEmail;
                  this.gender = tempData["gender"];
                  this.dateOfBirth = tempData["dateOfBirth"];
                  this.contactNo = tempData["contactNo"];
                  this.age=tempData["age"];
                  console.log("age is ",this.age);
                  
                }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​); 
  }

  ngAfterViewInit(): void {
   console.log("step2");
  }
  ngAfterViewChecked(): void {
  console.log("step3");
  }
  
  
  
  titleInput:any;
  firstName:any;
  lastName:any;
  dateOfBirth:any;
  role:any;
  gender:any;
  age:any;
  race:any;
  ethniCity:any;
  languagesKnown:any;
  emails:any;
  homeAddress:any;
  contactNo:any;
  emergTitle:any;
  emergFirstName:any;
  emergLastName:any;
  emergRelationship:any;
  emergEmail:any;
  emergHomeAddress:any;
  emergContact:any;
  hasAllergy:any;
  tokenEmail:any;
  allergies: any[] = [];
  showTab:boolean=false;
  disableElement:boolean=true;

  date = new Date();
  maxDate = (new Date().getFullYear()).toString() + "-0" + (new Date().getMonth() + 1).toString() + "-" + (new Date().getDate()).toString();

  buttonTitle:string = "Hide";
  visible:boolean = false;


 

  parentFunction(data){
       
    this.allergies.push(data);
console.log(this.allergies);

  }




  // changePatientInfo(event){
  //   let inputValue: any = (event.target as HTMLInputElement).value;
  //   console.log("inputValue is " + inputValue);
  //   this.emails=sessionStorage.getItem("sub");
  //   console.log("email", this.emails);
    
  //   this.apiService.getPatientByEmail(inputValue).subscribe(
  //             data2 => {​​​​ 
                 
  //                 let tempData = JSON.parse(data2)[0];
  //                 console.log("tempdata"+tempData);

  //                 this.titleInput = tempData["title"];
  //                 this.firstName = tempData["firstName"];
  //                 this.lastName = tempData["lastName"];
  //                 this.emails=this.tokenEmail;
  //                 this.gender = tempData["gender"];
  //                 this.dateOfBirth = tempData["dateOfBirth"];
  //                 this.contactNo = tempData["contactNo"];
  //                 this.age=tempData["age"];
  //                 console.log("age is ",this.age);
                  
  //               }​​​​,  
  //             error => {​​​​
  //                 console.log('Error: ', error);
  //             }​​​​); 
      
  // }




  // allergyIdInput:any;
  // allergyNameInput:any;
  // allergyTypeInput:any;
  // allergyDescriptionInput:any;
  // allergyClinicalInfoInput:any;
  // isAllergyFatalInput:any;




  showhideUtility(){
    this.visible = this.visible=true;
    this.buttonTitle = "Show";
    this.showTab=true;
  }

  hideUtility(){
    this.visible = this.visible=false;
    this.buttonTitle = "Hide";
    this.showTab=false;

  }

  
  dateChange(event) {
   
    console.log(event);
  }

  reloadPage() {
    window.location.reload();
  }

  
  
  
  onSave(event) {
  

  let formData=this.userFrm.value;
  let iTitle=formData["titleInput"];
  let iFName=formData["firstName"];
  let iLName=formData["lastName"];
  let idob=formData["dateOfBirth"];
  let iage=formData["age"];
  let igender=formData["gender"];
  let icontact=formData["contactNo"];
  let irace=formData["race"];
  let iethnicity=formData["ethniCity"];
  let ilanguagesKnown=formData["languagesKnown"];
  let iemail=formData["emails"];
  let ihomeAddress=formData["homeAddress"];
  let iemergTitle=formData["emergTitle"];
  let iemergFirstName=formData["emergFirstName"];
  let iemergLastName=formData["emergLastName"];
  let irelationship=formData["emergRelationship"];
  let iemergContact=formData["emergContact"];
  let iemergEmail=formData["emergEmail"];
  let iemergHomeAddress=formData["emergHomeAddress"];
  let ihasAllergy=formData["hasAllergy"];
  let iallergies=this.allergies;
  // let iallergyIdInput=formData["allergyIdInput"];
  // let iallergyNameInput=formData["allergyNameInput"];
  // let iallergyTypeInput=formData["allergyTypeInput"];
  // let iallergyDescriptionInput=formData[" allergyDescriptionInput"];
  // let iallergyClinicalInfoInput=formData["allergyClinicalInfoInput"];
  // let iallergyFatal=formData["isAllergyFatalInput"];
  


  let patientDemographics = {
    title: iTitle,
    firstName: iFName,
    lastName:iLName,
    dateOfBirth:idob,
    age:iage,
    gender:igender,
    contactNo:icontact,
    race:irace,
    ethnicity:iethnicity,
    languagesKnown:ilanguagesKnown,
    email:this.emails,
    homeAddress:ihomeAddress,
    emergTitle:iemergTitle,
    emergFirstName:iemergFirstName,
    emergLastName:iemergLastName,
    emergRelationship:irelationship,
    emergContact:iemergContact,
    emergEmail:iemergEmail,
    emergAddress:iemergHomeAddress,
    hasAllergy:ihasAllergy,
   allergy:iallergies
   
  };


  console.log("PatientDemographics" + JSON.stringify(patientDemographics));
  this.patientDetailsService.registerPatientDetails(patientDemographics).subscribe(data => {
    
    // alert("Patient details updated successful");
    // console.log("api called from component");
    // console.log(data);

    console.log("status is " + data.status);
    console.log("api called from component");
    console.log(data);
    this.notifyService.showSuccess("Patient details saved  sucessfully", "Success");
    this.userFrm.reset();
  },
  (error) => {
    //this.notifyService.showError("Failed to register patient", "Failed");
    this.notifyService.showError("Patient details not saved", "Failure");
  })

  
}


}