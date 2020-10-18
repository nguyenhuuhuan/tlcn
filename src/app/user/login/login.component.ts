import { UserService } from './../../service/user.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {Router } from "@angular/router"
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel={
    userName:'',
    password:''
  }

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private router:Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home');
    }
  }
  login(){
    this.authService.login()
  }
  logout(){
    this.authService.logout()
  }
  onSubmit(form:NgForm){
    this.userService.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home')       
      },
      err=>{
        if(err.status==400){
          console.log("success")
        }else{
          console.log(err)
        }
      }
    )
  }
 
}
