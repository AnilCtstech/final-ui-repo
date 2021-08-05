import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApicallService } from 'src/app/apicall.service';
import { Diagnosis } from 'src/app/models/diagnosis-model';
import { Medication } from 'src/app/models/medication-model';
import { NoteResponse } from 'src/app/models/noteResponse-model';
import { PatientProfile } from 'src/app/models/patient-profile-model';
import { Procedure } from 'src/app/models/procedure-model';
import { SentNote } from 'src/app/models/sentNote-model';
import { VitalSign } from 'src/app/models/vital-signs-model';
import { PatientManageService } from 'src/app/patient-manage.service';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { DiagnosisApiService } from '../../diagnosis-api.service';
import { ViewApiService } from '../view-api.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {
  closeResult=''
  sentNotes:SentNote[];
  page=1;
  selectedNoteId: any;
  noteResponses:NoteResponse[];
  collectionSize:number=0;
  diagnosis:Diagnosis[];
  patients:PatientProfile[];
  vitalSigns: VitalSign[];
  medications: Medication[];
  procedures: Procedure[];
  constructor( private apiService:ApicallService,private diagnosisApiService:DiagnosisApiService,config: NgbPaginationConfig,
    private modalService: NgbModal,private notifyService : ToasterNotificationService,private patientManageService:PatientManageService,private viewApiService:ViewApiService) {
    config.size = 'sm';
    config.boundaryLinks = true;
   }

  ngOnInit(): void {
    
    //this.getAllDiagnosis();

    this.patientManageService.getAllPatientsForVisit().subscribe(
      data=>{
        this.patients=data;
        console.log(this.patients);
        if(this.collectionSize){
          this.collectionSize=this.patients.length;
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then(
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

  getAllDiagnosis(){
    this.viewApiService.getAllDiagnosisForPhysian().subscribe(
      data=>{
        this.diagnosis=data;
        //let a=this.diagnosis.find(e=>true)?.collectionSize;
        console.log(this.diagnosis);
        if(this.collectionSize){
          this.collectionSize=this.diagnosis.length;
        }
      },
      error=>{console.error("Sent Note Error"+error)}
    );
  }
  viewVitals(content,id){
    //this.selectedNoteId=id;
    this.viewApiService.getAllVitalSignsByPatient(id).subscribe(
      data => {​​​​ 
            this.vitalSigns=data;
            console.log(this.diagnosis)
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
  viewMedication(content,id){
    //this.selectedNoteId=id;
    this.viewApiService.getAllMedicationByPatient(id).subscribe(
      data => {​​​​ 
            this.medications=data;
            console.log(this.diagnosis)
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
  viewDiagnosis(content,id){
    //this.selectedNoteId=id;
    this.viewApiService.getAllDiagnosisByPatient(id).subscribe(
      data => {​​​​ 
            this.diagnosis=data;
            console.log(this.diagnosis)
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
  viewProcedure(content,id){
    //this.selectedNoteId=id;
    this.viewApiService.getAllProcedureByPatient(id).subscribe(
      data => {​​​​ 
            this.procedures=data;
            console.log(this.diagnosis)
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
  }
}
