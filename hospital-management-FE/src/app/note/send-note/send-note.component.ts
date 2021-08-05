import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { Profile } from 'src/app/models/profile-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { Note } from '../note-model';

@Component({
  selector: 'app-send-note',
  templateUrl: './send-note.component.html',
  styleUrls: ['./send-note.component.css']
})
export class SendNoteComponent implements OnInit {

  profiles:Profile[];
  profile:any;
  searchName:string='';
  selectedName:String;
  selectedProfile:Profile|undefined;
  role:string='';
  note:Note;
  noteForm:any;
  constructor(private apiService:ApicallService,private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
   }

  getNameAndDesignation(name:string){   
    this.apiService.getAllEmployeeByName(name).subscribe(
              data => {​​​​ 
                  this.profiles=data;  
              }​​​​,  
              error => {​​​​
                  console.log('Error: ', error);
              }​​​​);
  }

  onSelect(event){
    this.profile=event;
    if(this.profile){
      this.role=this.profile.role;
    }
    //this.selectedProfile=this.profiles.find(e=>e.firstName===event.target.value);
    //this.role=this.selectedProfile?.role!;
  }


  nameChange(event){
    //this.searchName=(<HTMLInputElement>event.taget).value
  this.getNameAndDesignation( this.searchName);

}

onSubmit(sendNote:NgForm){
  console.log(sendNote.value);
  console.log(this.selectedProfile?.id);
  this.note=new Note(this.profile.id,sendNote.value.message,sendNote.value.urgency,this.role)
 console.log(this.note)
 this.apiService.sendNote(this.note).subscribe(
    data => {​​​​ 
          this.notifyService.showSuccess(data,"Send Note");
          //location.reload();
        }​​​​,  
    error => {​​​​
            this.notifyService.showError(error,"Send Note");
            //location.reload();
        }​​​​
 )
  

  console.log(this.note)

}


resultFullNameValue(value: any) {           
  return value.firstName +' '+value.lastName;
} 

inputFullNameValue(value: any)   {
  if(value.firstName)
    return value.firstName +' '+value.lastName
  return value;
}

search= (text$: Observable<string>) =>  text$.pipe( 
  debounceTime(200),
  distinctUntilChanged(),
  filter(term => term.length >= 2),
  switchMap((searchText)=>this.apiService.getAllEmployeeByName(searchText)),
);
// extractRole(event){

//   this.role=event.
// }
}
