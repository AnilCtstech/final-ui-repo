import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService:LoginService,private router :Router){}
  canActivate()
    {
      if(this.loginService.isloggedin()){
        return true;
      }else{
        this.router.navigate(['/login'])
        return false;
      }
      }

  // canDeactivate(){
  //   if(this.loginService.isloggedin()){
  //     //this.router.navigate(['/welcome'])
  //     return false;
  //   }else return true;
  // }
    
  
}
