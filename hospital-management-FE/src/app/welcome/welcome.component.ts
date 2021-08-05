import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { RegistrationComponent } from '../registration/registration.component';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  

  constructor(private loginService:LoginService
    ) {
      
     }

  ngOnInit(): void {
   // this.loggedin();
   this.checkRole();
  }

  loggedin():boolean{
    console.log("in welcome loggedin"+this.loginService.isloggedin())
    return this.loginService.isloggedin();
  }

  checkRole(){
   // let role=this.employeeRegistration.role;
    //console.log(role);
  }

}
