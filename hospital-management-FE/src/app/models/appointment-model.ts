import { Injectable } from "@angular/core";

export class Appointment {

    constructor(
       public appointmentId:number,
       public title:string,
       public description:string,
       public date:string,
       public time:string,
       public physician:string,
       public slot:string,
       public meetingTitle:string,
       public isAccepted:string,
       public employeeId:number,
       public patientId:number ){}
    
}

@Injectable({
    providedIn: "root",
  })
  export class AppointmentAdapter {
    adapt(appointment: any): Appointment {
      return new Appointment(appointment.appointmentId, appointment.title, appointment.description,appointment.date,
         appointment.time, appointment.physician, appointment.slot , appointment.meetingTitle, appointment.isAccepted, 
         appointment.employeeId, appointment.patientId);
    }
  }
