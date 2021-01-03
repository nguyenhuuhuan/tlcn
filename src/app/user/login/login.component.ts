import { UserService } from './../../service/user.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import {Router } from "@angular/router"
import { HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../../token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel={
    email:'',
    password:''
  }
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private toastr:ToastrService,

    private authService:AuthService,
    private userService:UserService,
    private router:Router,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success('Login successed.')

        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.warning('Login failed!', this.errorMessage)

      }
    );
  }
  logout() {
    this.tokenStorage.logout();
    window.location.reload();
  }
  reloadPage() {
    window.location.reload();
  }


  // onSubmit(form:NgForm){
  //   this.userService.login(form.value).subscribe(
  //     (res:any)=>{
  //       localStorage.setItem('token',res.token);
  //       this.router.navigateByUrl('/home')
  //     },
  //     err=>{
  //       if(err.status==400){
  //         console.log("success")
  //       }else{
  //         console.log(err)
  //       }
  //     }
  //   )
  // }

}
