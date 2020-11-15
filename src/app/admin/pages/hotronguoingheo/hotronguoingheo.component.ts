import { CausesService } from './../../../service/causes.service';
import { Component, Input, OnInit } from '@angular/core';
import { ICauses } from 'src/app/service/causes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hotronguoingheo',
  templateUrl: './hotronguoingheo.component.html',
  styleUrls: ['./hotronguoingheo.component.css']
})
export class HotronguoingheoComponent implements OnInit {
  @Input() cause:ICauses
  causeList: ICauses[];
  _id:number;
  editForm:FormGroup;
  submitted=false;
  constructor(
    private toastr: ToastrService,
    private causesService: CausesService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.causesService.getCausesList().subscribe(ps => this.causeList = ps);
    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderBy = query.get('orderby');
        console.log(orderBy);
      });
     
    //let Id = window.localStorage.getItem("editCauseId");
    this.editForm=this.fb.group({
      id:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      target:['',Validators.required],
      confirm:[''],
      raised:[''],
      accuracy:['',Validators.required],
      person:this.fb.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        dob:['',Validators.required],
        address:['',Validators.required],
        avatarUrl:['',Validators.required]
      })
    })
    
  }
  
  
  onSubmit(){
    this.submitted=true
    if(this.editForm.valid){
      return false;
    }else{
      this.causesService.updateCause(this.editForm.value).subscribe(
        (res)=>{
          this.toastr.success('Created Successfully!!!')
          this.editForm.reset()
          //this.ngZone.run(()=>this.router.navigateByUrl('/createCauses'))
        },(error)=>{
          console.log(error)
        });
      
    }
  }
  onEdit(cause:ICauses){
    this.causesService.formCause=cause;
    this.causesService.getById(this.causesService.formCause.id).subscribe((data:ICauses)=>{
      this.cause=data;
    })  
  }
}
