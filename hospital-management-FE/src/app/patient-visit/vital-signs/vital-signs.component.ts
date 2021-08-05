import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { ApicallService } from 'src/app/apicall.service';
import { Profile } from 'src/app/models/profile-model';
import { VitalSign, VitalSignAdapter } from 'src/app/models/vital-signs-model';
import { ToasterNotificationService } from 'src/app/toaster-notification.service';
import { VitalSignApiService } from '../vital-sign-api.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css']
})
export class VitalSignsComponent implements OnInit {
  public profile: Profile[];
  patient:any;
  public vitalSigns:VitalSign;
  @Input() patientId;
  constructor(private apiService:ApicallService,private vitalSignApiService:VitalSignApiService,private notifyService : ToasterNotificationService) { }

  ngOnInit(): void {
  }
  onSubmit(vitalForm:NgForm){
    const vitals=vitalForm.value;
    this.vitalSigns=new VitalSign(this.patientId,vitals.height,vitals.weight,vitals.bloodPressure,vitals.bodyTemperature,vitals.respirationRate);
    this.vitalSignApiService.saveVitalSigns(this.vitalSigns).subscribe(
        data => {​​​​ 
              this.notifyService.showSuccess(data,"Vital Signs Added.");
              //Reset form
            }​​​​,  
        error => {​​​​
                this.notifyService.showError(error,"Failure in adding Vital Signs.");
                //Reset form
            }​​​​
     );
  }
}
