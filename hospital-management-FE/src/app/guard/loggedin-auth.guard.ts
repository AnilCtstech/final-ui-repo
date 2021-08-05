import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinAuthGuard implements CanActivate {
  constructor(private loginService:LoginService,private router :Router){}
  canActivate()
    {
      if(this.loginService.isloggedin()){
        this.router.navigate(['/welcome'])
        return false;
      }else{
        return true;
      }
    }
  
}
