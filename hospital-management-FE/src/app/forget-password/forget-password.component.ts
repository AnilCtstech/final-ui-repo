import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';

import { ForgetPasswordService } from '../forget-password.service';
import { ToasterNotificationService } from '../toaster-notification.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email :string ='';
  message :string = '';
  load : boolean = false;
  showbutton : boolean = true;  
  showgobutton : boolean = false;
  constructor(private forgetPasswordService : ForgetPasswordService,
    private notifyService : ToasterNotificationService) { }

  ngOnInit(): void { 
  }

 

  sendPassword(email:any,form: NgForm){
    this.load = true;
    this.forgetPasswordService.getPassword(email).subscribe(
      data => {
         this.message = data;
         this.notifyService.showSuccess("your password has been sent to your mail", "Done!")
         this.load = false;
         this.showbutton = false;
         this.showgobutton = true;
         form.reset();
      },error => {
     
          this.notifyService.showError("Email Sending Failed", "Error")
        this.load = false;
        
        
       
      } )
  }

}
