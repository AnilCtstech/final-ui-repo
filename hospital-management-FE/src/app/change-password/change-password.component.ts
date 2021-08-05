import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms/';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { ChangePasswordService } from '../change-password.service';
import { ToasterNotificationService } from '../toaster-notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldpassword:any;
  newpassword:any;
  confirmpassword:any;
  showPassword: boolean;
  PasswordNew: boolean;
  confirmNew:boolean;
  ChangePasswordObj : {
    oldPassword :string,
    newPassword :string,
    confirmPassword :string
  }
  showbutton : boolean = true;
  showgobutton : boolean = false;

  constructor(private changePasswordService : ChangePasswordService,
    private notifyService : ToasterNotificationService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSave(oldpassword1:any,newpassword1:any,confirmpassword1:any,form: NgForm){

    this.ChangePasswordObj = {
      oldPassword: oldpassword1,
      newPassword :newpassword1,
      confirmPassword :confirmpassword1
    };

      this.changePasswordService.updatePassword(this.ChangePasswordObj).subscribe( data => {
          console.log(data);
          this.notifyService.showSuccess("Password is updated Successfully","Success!")
          this.showbutton = false;
          this.showgobutton = true;
          form.reset();
          
        },
        error => {
          if(oldpassword1 == null && newpassword1 == null && confirmpassword1==null){
            this.notifyService.showError("Please enter all the details","Error");
          }else if(oldpassword1 == null || oldpassword1 == ''){
            this.notifyService.showError("Enter old password","Error");
          }else if(newpassword1 == null || newpassword1 == ''){
            this.notifyService.showError("Enter new password","Error");
          }else if(confirmpassword1 == null || confirmpassword1 == ''){
            this.notifyService.showError("Please Confirm the Password","Error");
          }else {
            this.notifyService.showError("Failed to Update Password","Error")
            location.reload();
          }
          
        }
        
        
      )
  }

  logout() {
    localStorage.removeItem("jwtToken");
    this.router.navigate(["/login"]);
  }

 

}
