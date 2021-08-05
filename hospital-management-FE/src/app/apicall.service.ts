import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { NoteResponse, NoteResponseAdapter } from './models/noteResponse-model';
import { Profile, ProfileAdapter } from './models/profile-model';
import { SentNote, SentNoteAdapter } from './models/sentNote-model';
import { Note } from './note/note-model';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {



  constructor(private httpClient: HttpClient, private adapter: ProfileAdapter,private sentAdapter:SentNoteAdapter,
    private noteResponseAdapter:NoteResponseAdapter) { }

  getAllEmployeeByName(name: String): Observable<Profile[]> {
    let token = localStorage.getItem("jwtToken");
    const token1 = token?.slice(1, token.length - 1);
    let tokenStr = 'Bearer ' + token1;

    console.log(tokenStr)
    const headers = new HttpHeaders().set("Authorization", tokenStr)
    return this.httpClient.post<Profile[]>("http://localhost:8080/user/employee/name", name, { headers })
      .pipe(
        map((data: Profile[]) => {
          return data.map((item) => this.adapter.adapt(item));
        }), catchError(error => {
          return throwError("something went wrong.")
        })
      );

  }

  sendNote(noteReq: any): Observable<string> {
    let token = localStorage.getItem("jwtToken");
    const token1 = token?.slice(1, token.length - 1);
    let tokenStr = 'Bearer ' + token1;
    console.log(tokenStr)
    const headers = new HttpHeaders().set("Authorization", tokenStr)
    return this.httpClient.post<string>("http://localhost:8081/note/send-note", noteReq, { headers,responseType:'text' as 'json' });

  }
  
  sendNoteResponse(noteReq:any,id):Observable<string>{
    let token = localStorage.getItem("jwtToken");
   // const token1= token?.slice(1,token.length-1);
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)
    return this.httpClient.post<string>("http://localhost:8081/note/send-note-response/"+id,noteReq,{headers,responseType:'text' as 'json'});
  }
  getAllNotes(page):Observable<SentNote[]>{
    let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)
    const params=new HttpParams().set("page",page);
    return this.httpClient.get<SentNote[]>("http://localhost:8081/note/sent-note",{headers,params})
                    .pipe(
                      map((data:SentNote[])=>{
                        return data.map((item)=>this.sentAdapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );
  }
  getAllNotesResponse(id,page):Observable<NoteResponse[]>{
    let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)
    const params=new HttpParams().set("page",page);
    return this.httpClient.get<NoteResponse[]>("http://localhost:8081/note/send-note-response/"+id,{headers,params})
                    .pipe(
                      map((data:NoteResponse[])=>{
                        return data.map((item)=>this.noteResponseAdapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );
  }
  getAllRecievedNotes(page):Observable<SentNote[]>{
    let token = localStorage.getItem("jwtToken");
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)
    const params=new HttpParams().set("page",page);
    return this.httpClient.get<SentNote[]>("http://localhost:8081/note/received-note",{headers,params})
                    .pipe(
                      map((data:SentNote[])=>{
                        return data.map((item)=>this.sentAdapter.adapt(item));
                      }),catchError(error=>{
                        return throwError("something went wrong.")
                      })
                      );
  }

deleteNote(id):Observable<Object>{
    let token = localStorage.getItem("jwtToken");
   // const token1= token?.slice(1,token.length-1);
    let tokenStr='Bearer '+token;
    console.log(tokenStr)
    const headers=new HttpHeaders().set("Authorization",tokenStr)
    //const params=new HttpParams().set("id",id);
    return this.httpClient.delete("http://localhost:8081/note/sent/delete/"+id,{headers,responseType:'text' as 'json'});
}

deleteReceivedNote(id):Observable<Object>{
  let token = localStorage.getItem("jwtToken");
 // const token1= token?.slice(1,token.length-1);
  let tokenStr='Bearer '+token;
  console.log(tokenStr)
  const headers=new HttpHeaders().set("Authorization",tokenStr)
  //const params=new HttpParams().set("id",id);
  return this.httpClient.delete("http://localhost:8081/note/received/delete/"+id,{headers,responseType:'text' as 'json'});
}



}
