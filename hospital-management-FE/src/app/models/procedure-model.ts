import { Injectable } from "@angular/core";

export class Procedure {

    constructor(
       public patientId:number,  
       public procedureCode:string,
       public procedureDescription:string,
       public procedureIsdeprecated:any
       ){}
    
}

@Injectable({
    providedIn: "root",
  })
  export class ProcedureAdapter {
    adapt(procedure: any): Procedure {
      return new Procedure(procedure.patientId,procedure.procedureCode,
        procedure.procedureDescription,procedure.procedureIsdeprecated
        );
    }
  }
