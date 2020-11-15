import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonComponent } from 'src/app/admin/pages/person/person.component';
import { ICauses } from 'src/app/service/causes';
import {CausesService} from '../../../service/causes.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-causes',
  templateUrl: './create-causes.component.html',
  styleUrls: ['./create-causes.component.css']
})
export class CreateCausesComponent implements OnInit {
  causeList:ICauses[];
  submitted=false;
  form:FormGroup;

  constructor(
    private toastr:ToastrService,
    private causesService:CausesService,
    private activatedRoute:ActivatedRoute,
    public fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.form=this.fb.group({
      title:this.fb.control('',[Validators.required]),
      description:this.fb.control(''),
      target:this.fb.control('',[Validators.required]),
      confirm:[''],
      raised:[0],
      accuracy:this.fb.control('',[Validators.required]),
      person:this.fb.group({
        firstName:this.fb.control('',[Validators.required]),
        lastName:this.fb.control('',[Validators.required]),
        dob:this.fb.control(''),
        address:this.fb.control(''),
        avatarUrl:this.fb.control('')
      })
    })
    
  }
 
  onSubmit(){
    this.submitted=true
    if(!this.form.valid){
      return false;
      
    }else{
      this.causesService.addCause(this.form.value).subscribe(
        (res)=>{
          this.toastr.success('Created Successfully!!!')
          this.form.reset()
          //this.ngZone.run(()=>this.router.navigateByUrl('/createCauses'))
        
        },(error)=>{
          console.log(error)
        });
      
    }
  }
}
