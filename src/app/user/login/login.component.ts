import { UserService } from './../../service/user.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel={
    UserName:'',
    Password:''
  }

  constructor(
    private authService:AuthService,
    private userService:UserService
    ) { }

  ngOnInit() {
  }
  login(){
    this.authService.login()
  }
  logout(){
    this.authService.logout()
  }
  // onSubmit(form:ngForm){
  //   this.userService.login()
  // }
}
