import { temporaryDeclaration } from '@angular/compiler/src/compiler_util/expression_converter';
import { AfterViewChecked, EventEmitter, Input, Output } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms/';
import { empty } from 'rxjs';
import { Allergy } from 'src/app/allergy';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit, AfterViewInit, AfterViewChecked {


  @Input() allergy: Allergy = new Allergy();
  // allergies:Allergy[] | undefined;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  constructor(private apiservice: PatientDetailsService) { }


  ngOnInit() {

    this.apiservice.getAllAllergyTypes().subscribe(data => {
      let tempData = JSON.parse(data);
     
      console.log("tempdata"+tempData);

      this.allergyTypeInput = tempData;
      tempData.forEach( (value) => {
        this.allergyTypes?.push("");
        this.allergyTypes?.push(value);
       
        this.allergyTypes = this.allergyTypes.filter((element, i) => i === this.allergyTypes.indexOf(element))
        
        console.log(value);
       // this.allergyTypes.length=0;
       
        
      //  tempData.length=0;
      });

      console.log("allergyType -->" + tempData);
    });

  }


  @ViewChild('customForm1') someInput!: ElementRef;
  @ViewChild('f') userFrm!: NgForm;




  ngAfterViewInit(): void {
    console.log("step2");
  }
  ngAfterViewChecked(): void {
    console.log("step3");
  }

  allergyIdInput: any;
  allergyNameInput: any;
  allergyTypeInput: any;
  allergyDescriptionInput: any;
  allergyClinicalInfoInput: any;
  isAllergyFatalInput: any;

  allergyIds:string[]=[];
  allergyNames: string[] = [];
  allergyTypes:string[]=[];
 
  removedDuplicate: string[] = [];


    


  getAllergyDetailsByAllergyId(event: Event) {
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
    this.apiservice.getAllergyDetailsById(inputValue).subscribe(data => {
      let tempData = JSON.parse(data)[0];
      console.log("tempdata"+tempData);
     // this.allergyTypeInput = tempData["allergyType"];
    //  this.allergyNameInput = tempData["allergyName"];
      this.allergyClinicalInfoInput = tempData["allergenSource"];
      console.log("allergyNameInput"+this.allergyNameInput);
      console.log("allergyType" + tempData["allergyType"]);
    });
  }


  getAllergyDetailsByAllergyType(event: Event) {
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);
   
    this.apiservice.getAllergyDetailsByType(inputValue).subscribe(data => {
     //let tempData = JSON.parse(data)[0];

     let tempData: any[] = JSON.parse(data);
       tempData.forEach( (value) => {
      
        if (this.allergyIdInput==null || this.allergyIdInput!=null ){

      //  this.allergyNameInput= value.allergyName;
       // this.allergyIdInput = value.allergyId;
        
        
        this.allergyNames?.push(value.allergyName);
         this.allergyNames = this.allergyNames.filter((element, i) => i === this.allergyNames.indexOf(element))
      
        
        console.log(value);
      
              }
   
      }); 
     
     
     
      console.log(this.allergyNames);
      console.log("===============");
      
      console.log("tempdata"+tempData);
    
  
    });
    this.allergyNames.length=0;
  }


  getAllergyIdsByNames(event: Event) {
    let inputValue: any = (event.target as HTMLInputElement).value;
    console.log("inputValue is " + inputValue);

    this.apiservice.getAllergyIdByName(inputValue).subscribe(data => {
      //  let tempData = JSON.parse(data)[0];
  
        let tempData: any[] = JSON.parse(data);
         tempData.forEach( (value) => {
          
         
          if (this.allergyIdInput==null || this.allergyIdInput!=null){
  
        //  this.allergyNameInput= value.allergyName;
        //  this.allergyIdInput = value;
        
          this.allergyIds?.push(value);
         
          this.allergyIds = this.allergyIds.filter((element, i) => i === this.allergyIds.indexOf(element))
          
          console.log(value);
  
          }
          
        //  tempData.length=0;
        }); 
       
     console.log(this.allergyIds);
      });
      this.allergyIds.length=0;
  }

  onSave(event) {

    let formData = this.userFrm.value;
    let iallergyIdInput = formData["allergyIdInput"];
    let iallergyNameInput = formData["allergyNameInput"];
    let iallergyTypeInput = formData["allergyTypeInput"];
    let iallergyDescriptionInput = formData["allergyDescriptionInput"];
    let iallergyClinicalInfoInput = formData["allergyClinicalInfoInput"];
    let iallergyFatal = formData["isAllergyFatalInput"];



    let allergyDetails = {

      allergyId: iallergyIdInput,
      allergyName: iallergyNameInput,
      allergyType: iallergyTypeInput,
      allergyDescription: iallergyDescriptionInput,
      allergyClinicalInformation: iallergyClinicalInfoInput,
      isFatal: iallergyFatal,

    };


    console.log("allergy" + JSON.stringify(allergyDetails));
    this.userFrm.reset();

    this.parentFunction.emit(allergyDetails);
    console.log(allergyDetails);

  }

}
