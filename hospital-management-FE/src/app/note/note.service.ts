import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, NoteAdapter } from './note-model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  
  constructor(private httpClient:HttpClient) { }

  


}
