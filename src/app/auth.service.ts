import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API='http://localhost:3000/user/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized=false
  constructor(
    private http:HttpClient
  ) { }
  login(credentials):Observable<any>{
    return this.http.post(AUTH_API+'login',{
      email:credentials.email,
      password:credentials.password
    }, httpOptions)
  }
  register(user):Observable<any>{
    return this.http.post(AUTH_API+'register',{
      email:user.email,
      password:user.password,
      address:user.address,
      phoneNumber:user.phoneNumber,
      fullName:user.fullName
    }, httpOptions)
  }
  logout(){
    this.isAuthorized=false
  }
}
