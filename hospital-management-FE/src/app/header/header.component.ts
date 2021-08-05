import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name:any;
  tokendata : any;
  role:any;
  constructor(private loginService: LoginService) { }
  

  ngOnInit(): void {

  }

  loggedin(): boolean {
    this.name = sessionStorage.getItem("username");  
    this.role = sessionStorage.getItem("role");
    if(this.role == 'A'){
      this.role = "ADMIN";
    }else if(this.role == 'D'){
      this.role = "PHYSICIAN";
    }else if(this.role == 'N'){
      this.role = "NURSE";
    }else {
      this.role = "PATIENT";
    }
    return this.loginService.isloggedin();
  }

  logout() {
    this.loginService.logout();
  }

}
