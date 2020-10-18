import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  formModel=this.fb.group({
    UserName:['',Validators.required],
    Email:['', Validators.email],
    FullName:[''],
    Dob:[''],
    PhoneNumber:[''],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required],
    },{validators:this.comparePasswords}),

  });

  constructor(
    private fb:FormBuilder,
    private http:HttpClient
  ) { }


  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl=fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if(confirmPswrdCtrl.errors==null||'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value!=confirmPswrdCtrl.value)
      confirmPswrdCtrl.setErrors({passwordMismatch:true});
      else
      confirmPswrdCtrl.setErrors(null);
    }
  }
  //postUser(user:UserService)
  // register(){
  //   var body={
  //     UserName:this.formModel.value.UserName,
  //     Email:this.formModel.value.Email,
  //     Password:this.formModel.value.Passwords.Password,
  //     FullName:this.formModel.value.FullName,

  //   };
      //return this.http.post(this.BaseURI+'',body)
  // }

  // login(formData){
  //   return this.http.post
  // }
}
