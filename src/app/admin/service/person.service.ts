import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of, throwError  } from 'rxjs';
import { catchError ,delay, tap} from 'rxjs/operators';
import { IPerson } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personURL="http://localhost:3000/person";
  person=IPerson;
  formPerson:IPerson;
  constructor(
    private http:HttpClient
  ) { }

  getPoorPeopleList():Observable<IPerson[]>{
    return this.http.get<IPerson[]>(this.personURL).pipe(
      tap(receivedPerson=>console.log(`receivedPoorPeople=${JSON.stringify(receivedPerson)}`)),
      catchError(error=>of([]))
      )
  }
  postPoorPeople(data){
    return this.http.post(this.personURL,data);
  }
  addPoorPeople(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(this.personURL, person).pipe(
      tap((prod: IPerson) => console.log(`added poorPeople w/ id=${person.id}`)),
      catchError(this.handleError<IPerson>('addPoorPeople'))
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
