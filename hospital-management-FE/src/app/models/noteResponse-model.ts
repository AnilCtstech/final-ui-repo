import { Injectable } from "@angular/core";


export class NoteResponse{

constructor(
    public id:number,  
    public responseMessage:string,
    public status:boolean,
    public responseDateTime:string){}
}
    
@Injectable({
    providedIn: "root",
  })
  export class NoteResponseAdapter {
    adapt(note: any): NoteResponse {
      return new NoteResponse(note.id,note.responseMessage,note.status,note.responseDateTime);
    }
  }