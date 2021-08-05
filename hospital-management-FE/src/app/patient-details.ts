
export class PatientDetails {
    patientId : number;
     firstName :string;
    email : string;
    status : string;


    constructor( patientId : number,firstName : string,email : string,status : string){
        this.patientId = patientId;
        this.firstName = firstName;
        this.email = email;
        this.status = status;
    }

    
}

