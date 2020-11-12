import { element } from 'protractor';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
//import { _switch } from 'rxjs-compat/operator/switch';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private toastr:ToastrService,
    public userService:UserService
    )
    { }

  ngOnInit() {
  }
  onSubmit(){
    this.userService.register().subscribe(
      (res:any)=>{
        if(res){
          this.toastr.success('New user created!', 'Registration successed.')
          this.userService.formModel.reset();
          
        }
        // else{
        //   res.errors.forEach(element => {
        //     switch(element.code){
        //       case 'DuplicateUserName':
        //         this.toastr.error('Username is already taken','Registration failed.')
        //         //username is already taken
        //         console.log('Username is already taken')
        //         break;
        //       default:
        //         this.toastr.error(element.description,'Registration failed')
        //         //Registration failed
        //         console.log('Register failed')
        //         break;
        //     }
        //   });
        // }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
