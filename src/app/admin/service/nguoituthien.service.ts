
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ICharity } from './nguoituthien';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { ICauses } from 'src/app/service/causes';

@Injectable({
  providedIn: 'root'
})
export class NguoituthienService {
  private charityURL="http://localhost:3000/charity";
  
  formCharity:ICharity
  constructor(
    private http:HttpClient
  ) { }
  getCharityList():Observable<ICharity[]>{
    return this.http.get<ICharity[]>(this.charityURL).pipe(
      tap(receivedCharity=>console.log(`receivedCharity=${JSON.stringify(receivedCharity)}`)),
      catchError(error=>of([]))
    )
  }
  getById(id:number):Observable<ICharity>{
    const url=`${this.charityURL}/${id}`;
    return this.http.get<ICharity>(url).pipe(
      tap(selectedCharity=>console.log(`selected charity=${JSON.stringify(selectedCharity)}`))
      ,catchError(error=>of(new ICharity()))
    )
  }
  postCharity(data){
    return this.http.post(this.charityURL, data);
  }
}