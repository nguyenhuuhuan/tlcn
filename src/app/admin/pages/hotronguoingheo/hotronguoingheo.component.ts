import { Package1Service } from '../../../service/package1.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPackage1 } from 'src/app/service/package1';
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
  @Input() package1:IPackage1
  package1List: IPackage1[]=[];
  _id:number;
  editForm:FormGroup;
  submitted=false;
  p:number=1;
  firstName:any
  constructor(
    private toastr: ToastrService,
    private package1Service: Package1Service,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.package1Service.getPackage1List().subscribe(ps => this.package1List = ps);
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
        gender:['',Validators.required],
        dob:['',Validators.required],
        address:['',Validators.required],
        avatarUrl:['',Validators.required]
      })
    })

  }

  Search(){
    if(this.firstName==""){
      return this.ngOnInit()
    }else{
      this.package1List=this.package1List.filter(res=>{
        return res.person.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase())
      })
    }
  }

  key:string='title';
  reverse:boolean=false
  sort(key){
    this.key=key;
    this.reverse=!this.reverse
  }

  onSubmit(){
    this.submitted=true
    if(this.editForm.valid){
      return false;
    }else{
      this.package1Service.updatePackage1(this.editForm.value).subscribe(
        (res)=>{
          this.toastr.success('Updated Successfully!!!')
          this.package1Service.getPackage1List().subscribe(ps => this.package1List = ps);
          this.editForm.reset()
          //this.ngZone.run(()=>this.router.navigateByUrl('/createCauses'))
        },(error)=>{
          console.log(error)
        });

    }
  }
  onEdit(package1:IPackage1){
    this.package1Service.formPackage1=package1;
    this.package1Service.getById(this.package1Service.formPackage1.id).subscribe((data:IPackage1)=>{
      this.package1=data;
      if (this.package1 !== undefined) {
        this.package1Service.getById(this.package1Service.formPackage1.id).subscribe(data => {
          this.package1 = data;

          if (this.package1Service.formPackage1!=null && this.package1!=null) {
            this.editForm.controls['id'].setValue(this.package1.id);
            this.editForm.controls['title'].setValue(this.package1.title);
            this.editForm.controls['description'].setValue(this.package1.description);
            this.editForm.controls['target'].setValue(this.package1.target);
            this.editForm.controls['raised'].setValue(this.package1.raised);
            this.editForm.controls['confirm'].setValue(this.package1.confirm);
            this.editForm.controls['accuracy'].setValue(this.package1.accuracy);
            this.editForm.controls['person'].setValue(this.package1.person);
            this.editForm.controls['firstName'].setValue(this.package1.person.firstName);
            this.editForm.controls['lastName'].setValue(this.package1.person.lastName);
            this.editForm.controls['dob'].setValue(this.package1.person.dob);
            this.editForm.controls['address'].setValue(this.package1.person.address);
            this.editForm.controls['avatarUrl'].setValue(this.package1.person.avatarUrl);
          }
        }, error => { console.log("Error while gettig post details") });
      }

    })

  }
}
