import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNoteComponent } from './send-note.component';

describe('SendNoteComponent', () => {
  let component: SendNoteComponent;
  let fixture: ComponentFixture<SendNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
