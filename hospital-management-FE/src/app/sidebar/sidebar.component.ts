import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: any;
  constructor() { }

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
  }



}
