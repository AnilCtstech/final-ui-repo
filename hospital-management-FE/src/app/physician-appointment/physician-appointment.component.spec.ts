import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysianAppointmentComponent } from './physian-appointment.component';

describe('PhysianAppointmentComponent', () => {
  let component: PhysianAppointmentComponent;
  let fixture: ComponentFixture<PhysianAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysianAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysianAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
