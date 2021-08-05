import { Injectable } from "@angular/core";


export class SentNote{

constructor(
    public id:number,
    public message: string ,	
    public urgency:boolean ,	
    public fromEmployeeId:number,
	public toEmployee: string , 
  public fromEmployee: string ,
	public role:string,
    public responseMessage:string,
    public status:boolean,
    public dateTime:string,
    public collectionSize:number){}
}
    
@Injectable({
    providedIn: "root",
  })
  export class SentNoteAdapter {
    adapt(note: any): SentNote {
      return new SentNote(note.id,note.message,note.urgency,note.fromEmployeeId,note.toEmployee,note.fromEmployee,
        note.role,note.responseMessage,note.status,note.dateTime,note.collectionSize);
    }
  }