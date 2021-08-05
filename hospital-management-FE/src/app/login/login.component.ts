import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import JwtClientService from '../service/jwt-client.service';
import { LoginService } from './login.service';
import { ToasterNotificationService } from '../toaster-notification.service';
import { tokenData } from '../payload';


enum LoginStatus {
  success="LOGIN_SUCCESS",
  incorrectEmail="INCORRECT_EMAIL",
  incorrectPassword="INCORRECT_PASSWORD"
  
  }
  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordUpdate:boolean = false;
  tokendata :any
  role:any;
  showPassword : boolean = false;
  count : number = 0;
  name : string;

  sub:string;

  blocked : boolean = false;

  constructor(private jwtService:JwtClientService,
              private loginService:LoginService,
              private router:Router,
              private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let resp = this.jwtService.generateToken(form.value);

    resp.subscribe(
      response => {
        if (response != '' && response != null) {
          console.log(response)
          let jwtToken: string = JSON.stringify(response);
          console.log(response)
          this.tokendata = this.loginService.getDecodedAccessToken<tokenData>(jwtToken);
          this.isPasswordUpdate = this.tokendata.isUpdate;
          this.role = this.tokendata.role;
          this.name = this.tokendata.name;
          this.sub= this.tokendata.sub;
          localStorage.setItem("jwtToken",jwtToken);
          sessionStorage.setItem("username",this.name);
          sessionStorage.setItem("role",this.role);
          sessionStorage.setItem("sub",this.sub);
          if(this.role == "D" || this.role == "N"){
            if(this.isPasswordUpdate){
              this.router.navigate(["/inbox/appointment"])
            }else {
              this.router.navigate(["/changepassword"])
            }
          } else if(this.role == "A"){
            this.router.navigate(["/admin"])
          }else {
            this.router.navigate(["/patient-details"])
          }   
        }

      }, (error) => {
        console.log(error);
        this.count = this.count + 1;
        if(error.error =="INVALID USERNAME OR PASSWORD!") {
          this.notifyService.showError("Unauthorised User","Error"); 
          form.reset();
        }else if(error.error =="Blocked") {
          this.notifyService.showError("Your Account is Blocked","Blocked"); 
          form.reset();
        }else {
          form.reset();
        }
      },
    )
  }
}

