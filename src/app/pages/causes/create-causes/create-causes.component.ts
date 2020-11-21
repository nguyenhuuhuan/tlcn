import { Package2Service } from './../../../service/package2.service';
import { Package1Service } from 'src/app/service/package1.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonComponent } from 'src/app/admin/pages/person/person.component';
import { IPackage1 } from 'src/app/service/package1';
import { ToastrService } from 'ngx-toastr';
import { IPackage2 } from 'src/app/service/package2';
@Component({
  selector: 'app-create-causes',
  templateUrl: './create-causes.component.html',
  styleUrls: ['./create-causes.component.css']
})
export class CreateCausesComponent implements OnInit {
  package1List:IPackage1[];
  package2List:IPackage2[];

  submitted=false;
  formPackage1:FormGroup;
  formPackage2:FormGroup;
  constructor(
    private toastr:ToastrService,
    private package1Service:Package1Service,
    private package2Service:Package2Service,
    private activatedRoute:ActivatedRoute,
    public fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.package1Service.getPackage1List().subscribe(ps => this.package1List = ps);
    //this.package2Service.getPackage2List().subscribe(ps => this.package2List = ps);

    this.activatedRoute.queryParamMap.subscribe(
      query => {
        const orderBy = query.get('orderby');
        console.log(orderBy);
      });



    this.formPackage1=this.fb.group({
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
    this.formPackage2=this.fb.group({
      title:this.fb.control('',[Validators.required]),
      description:this.fb.control(''),
      target:this.fb.control('',[Validators.required]),
      confirm:[''],
      raised:[0],
      accuracy:this.fb.control('',[Validators.required]),
      createBy:this.fb.control('',[Validators.required]),
      createDate:this.fb.control('',[Validators.required]),
      restaurant:this.fb.group({
        name:this.fb.control('',[Validators.required]),
        phoneNumber:this.fb.control('',[Validators.required]),
        address:this.fb.control(''),
      }),
      listPeople:this.fb.array([


      ])
    })

  }

  onSubmit(){
    this.submitted=true
    if(!this.formPackage1.valid){
      return false;

    }else{
      this.package1Service.addPackage1(this.formPackage1.value).subscribe(
        (res)=>{
          this.toastr.success('Created Successfully!!!')
          this.formPackage1.reset()
          //this.ngZone.run(()=>this.router.navigateByUrl('/createCauses'))

        },(error)=>{
          console.log(error)
        });

    }
  }

  listPeople():FormArray{
    return this.formPackage2.get('listPeople') as FormArray;
  }
  newListPeople(): FormGroup {
    return this.fb.group({
      name:this.fb.control('',[Validators.required]),
      dob:this.fb.control('',[Validators.required]),
      gender:this.fb.control('',[Validators.required]),
      phoneNumber:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required]),
      address:this.fb.control(''),
    })
  }
  addListPeople(){
    const control = new FormControl('', Validators.required);
    this.listPeople().push(this.newListPeople());
  }
  removeListPeople(index:number){
    this.listPeople().removeAt(index)
  }
}
