import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinementsComponent } from './appoinements.component';

describe('AppoinementsComponent', () => {
  let component: AppoinementsComponent;
  let fixture: ComponentFixture<AppoinementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
