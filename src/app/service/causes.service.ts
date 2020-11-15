import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, tap } from 'rxjs/operators';
import { ICauses } from './causes';
import { Observable, of, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class CausesService {
  private causesURL="http://localhost:3000/causes";
  //private causes:ICauses[];
  
  cause=ICauses;
  formCause:ICauses;
  editForm:FormGroup;
  constructor(
    private http:HttpClient
  ) { }

  getCausesList():Observable<ICauses[]>{
    return this.http.get<ICauses[]>(this.causesURL).pipe(
      tap(receivedCauses=> console.log(`receivedCauses=${JSON.stringify(receivedCauses)}`)),
      catchError(error=>of([]))
      )
  }

  getById(id:number):Observable<ICauses>{
    const url=`${this.causesURL}/${id}`;
    return this.http.get<ICauses>(url).pipe(
      tap(selectedCause=>console.log(`selected causes=${JSON.stringify(selectedCause)}`))
       ,catchError(error=>of(new ICauses()))
      );
  }
  postCause(data){
    return this.http.post(this.causesURL,data);
  }
  addCause(cause: ICauses): Observable<ICauses> {
    return this.http.post<ICauses>(this.causesURL, cause).pipe(
      tap((prod: ICauses) => console.log(`added causes w/ id=${cause.id}`)),
      catchError(this.handleError<ICauses>('addCauses'))
    );
  }

  updateCause(causes:ICauses):Observable<any>{
    const url=`${this.causesURL}/${causes.id}`;
    return this.http.put(url,causes).pipe(
      tap(selectedCause=>console.log(`updateCause id=${JSON.stringify(selectedCause)}`)),
      catchError(error=>of(new ICauses()))
    );
  }
  deleteCause(id: any): Observable<ICauses> {
    const url = `${this.causesURL}/${id}`;
    return this.http.delete<ICauses>(url).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.handleError<ICauses>('deleteCategory'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}
