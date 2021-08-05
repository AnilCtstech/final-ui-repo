import { Injectable } from "@angular/core";

export class PatientProfile {
    [x: string]: any;

    constructor(
        public patientId : number,
        public title : string,
        public firstName : string,
        public lastName : string,
        public email : string,
        public dateOfBirth : string,
        public contactNo : string,
        public gender : string,
        public race : string,
        public ethnicity : string,
        public homeAddress : string){}
}

@Injectable({
    providedIn: "root",
  })
  export class PatientProfileAdapter {
    adapt(patientprofile: any): PatientProfile {
      return new PatientProfile(patientprofile.patientId, patientprofile.title, patientprofile.firstName, 
        patientprofile.lastName, patientprofile.email, patientprofile.dateOfBirth, patientprofile.contactNo,
        patientprofile.gender, patientprofile.race, patientprofile.ethnicity, patientprofile.homeAddress);
    }
  }
