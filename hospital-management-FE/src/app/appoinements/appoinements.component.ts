import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { ToasterNotificationService } from '../toaster-notification.service';


@Component({
  selector: 'app-appoinements',
  templateUrl: './appoinements.component.html',
  styleUrls: ['./appoinements.component.css']
})
export class AppoinementsComponent implements OnInit {

  constructor(private apiService: RegistrationService, private notifyService: ToasterNotificationService) { }

  weekklyAppointmentList: any;
  hasAppointmentsToday: Boolean = false;
  role: any;
  name: string;
  p: number = 1;

  ngOnInit(): void {

    this.role = sessionStorage.getItem("role");
    if (this.role == 'A') {
      this.role = "ADMIN";
    } else if (this.role == 'D') {
      this.role = "PHYSICIAN";
    } else if (this.role == 'N') {
      this.role = "NURSE";
    } else {
      this.role = "PATIENT";
    }

    this.apiService.getWeeklyAppointments().subscribe(data => {
      console.log("status is " + data.status);
      console.log("weekly apointments api called");
      for (var val of data) {
        this.hasAppointmentsToday = true;
        if (val["editHistory"] == null || val["editHistory"] == undefined) {
          val["editHistory"] = "NA";
        }
      }
      this.weekklyAppointmentList = data;
      console.log(this.weekklyAppointmentList);

    })
  }

  getPatientAppintmentHistory(event) {
    console.log("val " + this.name);
    this.apiService.getPatientAppintmentHistory(this.name).subscribe(data => {
      console.log("data is " + JSON.stringify(data));
      for (var val of data) {
        this.hasAppointmentsToday = true;
        if (val["editHistory"] == null || val["editHistory"] == undefined) {
          val["editHistory"] = "NA";
        }
      }
      this.weekklyAppointmentList = data;
    })
    //((document.getElementById("titleid") as HTMLInputElement).value) = 1;
  }

  getPhysicianAppintmentHistory(event) {
    console.log("val " + this.name);
    this.apiService.getPhysicianAppintmentHistory(this.name).subscribe(data => {
      console.log("data is " + JSON.stringify(data));
      for (var val of data) {
        this.hasAppointmentsToday = true;
        if (val["editHistory"] == null || val["editHistory"] == undefined) {
          val["editHistory"] = "NA";
        }

      }
      this.weekklyAppointmentList = data;
    })
    //((document.getElementById("titleid") as HTMLInputElement).value) = 1;
  }

  formatString(title: string): string {
    var newTitle = title;
    if (title.length > 40) {
      newTitle = title.substring(0, 60);
      return newTitle;
    } else {
      console.log("TITLE "+newTitle+" "+newTitle.length)
      while (newTitle.length < 41) {
        newTitle = newTitle.concat("                    ");
      }
      console.log("newTitle length " + newTitle.length)
    }
    return newTitle;
  }

  declineAppointment(obj) {
    console.log("appointment declined for " + JSON.stringify(obj));
    console.log("appoitnemtn ID " + obj.appointmentId);
    this.apiService.declineAppointment(obj.appointmentId).subscribe(data => {
      console.log("appointment declined response " + JSON.stringify(data));
      this.notifyService.showSuccess("Appointment declined successfully", "Success");
      this.updateDataModel(obj.appointmentId);
    }, (error) => {
      this.notifyService.showSuccess("Appointment declined successfully", "Success");
      this.updateDataModel(obj.appointmentId);
    })
  }

  updateDataModel(appointmentId: string) {
    var temp = this.weekklyAppointmentList;
    const temp2 = Array();
    for (var val of temp) {
      if (val["appointmentId"] == appointmentId) {
        continue;
      }
      temp2.push(val);
    }
    console.log("data model updated for Id" + appointmentId);
    console.log("New data model " + temp2);
    this.weekklyAppointmentList = temp2;
  }

}
