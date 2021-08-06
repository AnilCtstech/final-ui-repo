import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PatientRegistrationComponent } from './patient/patient-registration/patient-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './guard/auth.guard';

import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SidebarComponent } from './sidebar/sidebar.component';

import { RecievedNoteComponent } from './note/recieved-note/recieved-note.component';
import { SentNoteComponent } from './note/sent-note/sent-note.component';



import { AppoinementsComponent } from './appoinements/appoinements.component';
import { HeaderInterceptor } from './interceptors/HeaderInterceptor';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { AllergyComponent } from './patient/patient-details/allergy/allergy.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PhysianAppointmentComponent } from './physician-appointment/physician-appointment.component';
import { MedicationComponent } from './patient-visit/medication/medication.component';
import { DiagnosisComponent } from './patient-visit/diagnosis/diagnosis.component';
import { ProcedureComponent } from './patient-visit/procedure/procedure.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { VitalSignsComponent } from './patient-visit/vital-signs/vital-signs.component';
import { VisitDetailsComponent } from './patient-visit/view/visit-details/visit-details.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SendNoteComponent } from './note/send-note/send-note.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import {ChartsModule } from 'ng2-charts';
import { StaffManagementComponent } from './staff-management/staff-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    LoginComponent,
    ChangePasswordComponent,
    PatientRegistrationComponent,
    RegistrationComponent,
    DashboardComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    SidebarComponent,
    SendNoteComponent,
    RecievedNoteComponent,
    SentNoteComponent,
    ForgetPasswordComponent,
    AppoinementsComponent,
    PatientDetailsComponent,
    AllergyComponent,
    PhysianAppointmentComponent,
    MedicationComponent,
    DiagnosisComponent,
    ProcedureComponent,
    PatientVisitComponent,
    VitalSignsComponent,
    VisitDetailsComponent,
    PatientManagementComponent,
    AdminDasboardComponent,
    StaffManagementComponent
    
  
    
  ],
  imports: [
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut : 2000,
      progressBar : true,
      progressAnimation : 'increasing'
    }),
    NgbModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ChartsModule,
    


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
