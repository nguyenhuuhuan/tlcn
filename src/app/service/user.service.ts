import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {IUser} from '../service/users';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:IUser
  readonly userURL="http://localhost:3000/user";
  formModel=this.fb.group({
    userName:['',Validators.required],
    email:['', Validators.email],
    fullName:[''], 
    phoneNumber:[''],
    passwords:this.fb.group({
      password:['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',Validators.required],
    },{validators:this.comparePasswords}),

  });
  
  constructor(
    private fb:FormBuilder,
    private http:HttpClient
  ) { }


  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl=fb.get('confirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if(confirmPswrdCtrl.errors==null||'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('password').value!=confirmPswrdCtrl.value)
      confirmPswrdCtrl.setErrors({passwordMismatch:true});
      else
      confirmPswrdCtrl.setErrors(null);
    }
  }
  


  login(formData){
    return this.http.post(this.userURL+'/login',formData)
  }
  getUserProfile(){
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('token')})
    return this.http.get(this.userURL+'/userProfile',{headers:tokenHeader});
  }
  // postUser(user:IUser){
  //   return this.http.post(environment.apiBaseUrl+'/register', user)
  // }
  register(){
    var body={
      userName:this.formModel.value.userName,
      email:this.formModel.value.email,
      password:this.formModel.value.passwords.password,
      fullName:this.formModel.value.fullName,

    };
      return this.http.post(this.userURL+'/register',body)
  }

  // login(formData){
  //   return this.http.post
  // }
}
