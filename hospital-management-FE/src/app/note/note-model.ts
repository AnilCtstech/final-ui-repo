import { Injectable } from "@angular/core";


export class Note{

constructor(
	public toEmployeeId: number ,
  public message: string ,	
  public urgency:boolean ,	
	public role:string){}
}
    
@Injectable({
    providedIn: "root",
  })
  export class NoteAdapter {
    adapt(note: any): Note {
      return new Note(note.toEmployee,note.message,note.urgency,note.role );
    }
  }