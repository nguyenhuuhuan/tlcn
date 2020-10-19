import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, tap } from 'rxjs/operators';
import { ICauses } from './causes';
import { Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CausesService {
  private causesURL="http://localhost:3000/causes";
  private causes:ICauses[]
  private

  constructor(
    private http:HttpClient
  ) { }

  getCausesList():Observable<ICauses[]>{
    return this.http.get<ICauses[]>(this.causesURL).pipe(
      tap(receivedCauses=> console.log(`receivedCauses=${JSON.stringify(receivedCauses)}`)),
      catchError(error=>of([]))
      )
  }
  // getCausesList():Observable<ICauses[]>{
  //   return of(this.causes).pipe(delay(50));
  // }
  // getCauseById(id:string):Observable<ICauses>{
  //   return this.http.get<ICauses>(this.causesURL)(cause=>cause.id===id))
  // }
  getById(id:number):Observable<ICauses>{
    const url=`${this.causesURL}/${id}`;
    return this.http.get<ICauses>(url).pipe(
      tap(selectedCause=>console.log(`selected movie=${JSON.stringify(selectedCause)}`))
      // ,catchError(error=>of(new ICauses))
      );
    // const cause=this.causes.find(p=>p.id===id);
    // if(cause){
    //   return of(cause).pipe(delay(50));
    // }else{
    //   return throwError(new Error('404 Not Found'));
    // }
  }
}
