import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentNoteComponent } from './sent-note.component';

describe('SentNoteComponent', () => {
  let component: SentNoteComponent;
  let fixture: ComponentFixture<SentNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
