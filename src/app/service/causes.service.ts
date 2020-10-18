import { HttpClient } from '@angular/common/http';
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
  //=[
  //   {
  //     id: '855d9c00',
  //     title: 'Help Yeati to continue her Primary Education',
  //     target: 1000,
  //     raised: 2000,
  //     imageUrl:'../assets/123.jpg',
  //     description:'Giup do nguoi ngheo o TPHCM'
  //   },
  //   {
  //     id: '855d',
  //     title: 'Help Yeati to continue her Primary Education',
  //     target: 3000,
  //     raised: 2420,
  //     imageUrl:'../assets/123.jpg',
  //     description:'Giup do nguoi ngheo Mien Trung'
  //   },
  //   {
  //     id: '1',
  //     title: 'Support Nahid for His pneumonia treatment',
  //     target: 2989,
  //     raised: 1890,
  //     imageUrl:'../assets/123.jpg',
  //     description:'First featurette heading. It’ll blow your mind. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo'
  //   }
  // ]
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
  getById(id:string):Observable<ICauses>{
    const cause=this.causes.find(p=>p.id===id);
    if(cause){
      return of(cause).pipe(delay(50));
    }else{
      return throwError(new Error('404 Not Found'));
    }
  }
}
