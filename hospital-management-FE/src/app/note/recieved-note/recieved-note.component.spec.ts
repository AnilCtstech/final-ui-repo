import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedNoteComponent } from './recieved-note.component';

describe('RecievedNoteComponent', () => {
  let component: RecievedNoteComponent;
  let fixture: ComponentFixture<RecievedNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievedNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
