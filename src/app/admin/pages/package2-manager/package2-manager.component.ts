import { IPackage2 } from 'src/app/service/package2';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Package2Service } from 'src/app/service/package2.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { IListPeople } from 'src/app/service/package2';
import { error } from 'jquery';

@Component({
  selector: 'app-package2-manager',
  templateUrl: './package2-manager.component.html',
  styleUrls: ['./package2-manager.component.scss']
})
export class Package2ManagerComponent implements OnInit {

  @Input() package2: IPackage2
  package2List: IPackage2[] = [];
  IPeople:IListPeople[]=[];
  _id: string;
  editForm: FormGroup;
  submitted = false;
  p: number = 1;
  title: any
  constructor(
    private toastr: ToastrService,
    private package2Service: Package2Service,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    this.package2Service.getPackage2List().subscribe(ps => this.package2List = ps);
    // this.activatedRoute.queryParamMap.subscribe(
    //   query => {
    //     const orderBy = query.get('orderby');
    //     console.log(orderBy);
    //   });

      this.editForm = this.fb.group({
        _id:[''],
        title: ['', Validators.required],
        description: ['',Validators.required],
        target: ['', Validators.required],
        confirm:[''],
        raised: [0],
        accuracy: ['', Validators.required],
        createDate: [Date.now],
        idUser:[this.tokenStorage.getUser().id,Validators.required],
        restaurant: this.fb.group({
          name: ['', Validators.required],
          phoneNumber: ['', Validators.required],
          address: [''],
        }),
        listPeople: this.fb.array([
          this.newListPeople()
        ])
      })

    if (this.package2List) {
      this.package2List.forEach(user => {
          this.addListPeople();
      });
    } else {
        this.addListPeople();
    }
  }

  Search(){
    if(this.title==""){
      return this.ngOnInit()
    }else{
      this.package2List=this.package2List.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
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
    if(this.editForm.invalid){
      console.log(this.editForm.invalid)
      return false;
    }else{

      // let _id=this.editForm.controls['_id'].setValue(this.package2._id)
      // console.log(_id)
      // this.package2Service.getById(this.package2Service.formPackage2._id)
      this.package2Service.updatePackage2(this.package2Service.formPackage2._id,this.editForm.value).subscribe(
        (res)=>{
          this.toastr.success('Updated Successfully!!!')
          this.package2Service.getPackage2List().subscribe(ps => this.package2List = ps);
          this.editForm.reset()
          //this.ngZone.run(()=>this.router.navigateByUrl('/createCauses'))
        },(error)=>{
          console.log(error)
        });
    }
  }
  // onEdit(package2:IPackage2){
  //   this.package2Service.formPackage2=package2;
  //   this.package2Service.getById(this.package2Service.formPackage2._id).subscribe((data:IPackage2)=>{
  //     this.package2=data;
  //     if (this.package2 !== undefined) {
  //       this.package2Service.getById(this.package2Service.formPackage2._id).subscribe(data => {
  //         this.package2 = data;
  //          if (this.package2Service.formPackage2!=null && this.package2!=null) {
  //           // this.editForm.controls['_id'].setValue(this.package2._id);
  //           // this.editForm.patchValue(this.package2List);
  //           this.editForm.controls['title'].setValue(this.package2.title);
  //           this.editForm.controls['description'].setValue(this.package2.description);
  //           this.editForm.controls['target'].setValue(this.package2.target);
  //           this.editForm.controls['raised'].setValue(this.package2.raised);
  //           this.editForm.controls['confirm'].setValue(this.package2.confirm);
  //           this.editForm.controls['accuracy'].setValue(this.package2.accuracy);
  //           this.editForm.controls['restaurant'].setValue(this.package2.restaurant);
  //           // this.editForm.controls['listPeople'].patchValue(this.package2.listPeople);

  //         }
  //         this.editForm.setControl('listPeople',this.setExsitingPeople(this.package2.listPeople));

  //       }, error => { console.log("Error while gettig edit details") });
  //     }

  //   })
  // }
  onEdit(package2:IPackage2){
    this.editForm.patchValue({
      _id:package2._id,
      title:package2.title,
      description:package2.description,
      target:package2.target,
      raised:package2.raised,
      confirm:package2.confirm,
      accuracy:package2.accuracy,
      restaurant:{
        name:package2.restaurant.name,
        phoneNumber:package2.restaurant.phoneNumber,
        address:package2.restaurant.address
      },
      listPeople:package2.listPeople
    })
  //  this.editForm.setControl('listPeople',this.setExsitingPeople(package2.listPeople))
   this.editForm.controls['listPeople']=this.setExsitingPeople(package2.listPeople)
  }
  setExsitingPeople(peopleSets:IListPeople[]):FormArray{
    const formArray=new FormArray([]);
    peopleSets.forEach(s=>{
      formArray.push(this.fb.group({
        fullName:s.fullName,
        dob:s.dob,
        address:s.address,
        phoneNumber:s.phoneNumber,
        email:s.email,
        gender:s.gender
      }))
    })
    return formArray;
  }
  listPeople():FormArray{
    return this.editForm.get('listPeople') as FormArray;
  }
  newListPeople(): FormGroup {
    return this.fb.group({
      fullName:['',Validators.required],
      dob:this.fb.control('',[Validators.required]),
      gender:this.fb.control('',[Validators.required]),
      phoneNumber:this.fb.control('',[Validators.required]),
      email:this.fb.control(''),
      address:this.fb.control(''),
    })
  }
  addListPeople(){
    const control = new FormControl('', Validators.required);
    this.listPeople().push(this.newListPeople());
  }
}
