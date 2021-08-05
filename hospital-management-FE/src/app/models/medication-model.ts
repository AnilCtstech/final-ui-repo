import { Injectable } from "@angular/core";

export class Medication {

    constructor(
       public patientId:number,  
       public drugId:string,
       public drugName:string,
       public drugGenericName:string,
       public drugStrength:string,
       public drugForm:string){}

    
}

@Injectable({
    providedIn: "root",
  })
  export class MedicationAdapter {
    adapt(medication: any): Medication {
      return new Medication(medication.patientId,medication.drugId,medication.drugName,medication.drugGenericName,medication.drugStrength,medication.drugForm);
    }
  }
