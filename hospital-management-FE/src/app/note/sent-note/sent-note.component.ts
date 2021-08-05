import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApicallService } from 'src/app/apicall.service';
import { NoteResponse } from 'src/app/models/noteResponse-model';
import { SentNote } from 'src/app/models/sentNote-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';

@Component({
  selector: 'app-sent-note',
  templateUrl: './sent-note.component.html',
  styleUrls: ['./sent-note.component.css']
})
export class SentNoteComponent implements OnInit {
  closeResult=''
  sentNotes:SentNote[];
  page=1;
  selectedNoteId: any;
  noteResponses:NoteResponse[];
  collectionSize:number=0;
  constructor( private apiService:ApicallService,config: NgbPaginationConfig,private modalService: NgbModal,private notifyService : ToasterNotificationService) {
    config.size = 'sm';
    config.boundaryLinks = true;
   }

  ngOnInit(): void {
    this.apiService.getAllNotes(this.page-1).subscribe(
      data=>{
        this.sentNotes=data;
        //this.collectionSize=this.sentNotes.length;
        let a=this.sentNotes.find(e=>true)?.collectionSize;
        if(a!=undefined){
         this.collectionSize=a;
        }
      },
      error=>{console.error("Sent Note Error"+error)}
    );
  }

  onDelete(id){
    this.apiService.deleteNote(id).subscribe(
      data=>{
        console.log(data);
        this.ngOnInit();
      },
      error=>{console.error("Sent Note Error"+error)}
    );
  }

  openContent(content) {
    //this.onSelect(content,id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `${result}`;
        // if(this.closeResult=='send'){
        // }
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
  onSelect(content,id){
    this.selectedNoteId=id;
    this.apiService.getAllNotesResponse(id,this.page-1).subscribe(
      data => {​​​​ 
            this.noteResponses=data;
            console.log(this.noteResponses)
            console.log(this.sentNotes)

            this.openContent(content);
       // this.notifyService.showSuccess("Send Note");
        //location.reload();
            }​​​​,  
        error => {​​​​
      this.notifyService.showInfo("No Reply for this note","No respose found!")
      //this.notifyService.showError(error,"No Response found!");
      //location.reload();
            }    
    )
    console.log(this.selectedNoteId)
  }

  nextPage(currentPage){
    console.log()
    this.ngOnInit();
  }

}
