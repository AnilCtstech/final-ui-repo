import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { findIndex } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { SentNote } from 'src/app/models/sentNote-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';

@Component({
  selector: 'app-recieved-note',
  templateUrl: './recieved-note.component.html',
  styleUrls: ['./recieved-note.component.css']
})
export class RecievedNoteComponent implements OnInit {

  closeResult = '';
  message='';
  recievedNotes:SentNote[];
  page=1;
  selectedNoteId;
  collectionSize:number=0;
  constructor(private modalService: NgbModal,private apiService:ApicallService,config: NgbPaginationConfig,
    private notifyService : ToasterNotificationService, private router:Router) {
    config.size = 'sm';
    config.boundaryLinks = true;
   }

  ngOnInit(): void {
    this.apiService.getAllRecievedNotes(this.page-1).subscribe(
      data=>{
        this.recievedNotes=data;
        //this.collectionSize=this.recievedNotes.
         // let first=this.recievedNotes.find(e=>true);
         let a=this.recievedNotes.find(e=>true)?.collectionSize;
         if(a!=undefined){
          this.collectionSize=a;
         }
          
      },
      error=>{console.error("Sent Note Error"+error)}
    );
  }

  openContent(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `${result}`;
        if(this.closeResult=='send'){
          //console.log(this.message+" : "+id);
         // this.apicallService.sendNoteResponse()
        }
      }, 
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit(sendNote:NgForm){
    //console.log(sendNote.value.message);
  //   this.note=new Note(this.selectedProfile?.id!,sendNote.value.message,sendNote.value.urgency,this.role)
  //  console.log(this.note)
    const noteId=this.selectedNoteId;
    const msg =  sendNote.value.message;
    this.apiService.sendNoteResponse(msg,noteId).subscribe(
      data => {​​​​ 
      this.notifyService.showSuccess(data,"Send Note");
      //location.reload();
          }​​​​,  
      error => {​​​​
    this.notifyService.showError(error,"Send Note");
    location.reload();
          }​​​​);
  this.router.navigate(["note/recieve"])

  
    //console.log(this.note)
  
  }

  onSelect(id){
    this.selectedNoteId=id;
    console.log(this.selectedNoteId)
  }
 
  onDelete(id){
    console.log(id);
    this.apiService.deleteReceivedNote(id).subscribe(
      data=>{
        console.log(data);
        this.ngOnInit();
      },
      error=>{console.error("Sent Note Error"+error)}
    );
  }

  nextPage(currentPage){
    this.page=currentPage;
    this.ngOnInit();
  }
}
