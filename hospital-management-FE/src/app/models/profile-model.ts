import { Injectable } from "@angular/core";

export class Profile {

    constructor(
       public id:number,
       public firstName:string,
       public lastName:string,
       public role:string){}

    
}

@Injectable({
    providedIn: "root",
  })
  export class ProfileAdapter {
    adapt(profile: any): Profile {
      return new Profile(profile.id, profile.firstName, profile.lastName,profile.role );
    }
  }
