import { Injectable } from "@angular/core";

export class VitalSign {

    constructor(
       public patientId:number,  
       public height:number,
       public weight:number,
       public bloodPressure:string,
       public bodyTemperature:string,
       public respirationRate:string){}

    
}

@Injectable({
    providedIn: "root",
  })
  export class VitalSignAdapter {
    adapt(vitalSign: any): VitalSign {
      return new VitalSign(vitalSign.patientId,vitalSign.height,vitalSign.weight,vitalSign.bloodPressure,vitalSign.bodyTemperature,vitalSign.respirationRate);
    }
  }
