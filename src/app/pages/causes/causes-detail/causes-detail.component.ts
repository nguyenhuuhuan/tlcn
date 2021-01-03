import { IPackage1 } from 'src/app/service/package1';
import { NguoituthienService } from './../../../service/nguoituthien.service';
import { ICharity } from './../../../service/nguoituthien';
import { Package1Service } from '../../../service/package1.service';
import { DonaterService } from '../../../service/donater.service';
import { Component, OnInit ,Input,AfterViewChecked, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {map, subscribeOn, switchMap} from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'url';
import { TokenStorageService } from 'src/app/token-storage.service';
import { isNullOrUndefined } from 'util';

declare var paypal;
@Component({
  selector: 'app-causes-detail',
  templateUrl: './causes-detail.component.html',
  styleUrls: ['./causes-detail.component.css']
})
export class CausesDetailComponent implements OnInit {
  @Input() package1:IPackage1;
  //Paypal
  //@ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  paidFor=false;
  donate:number;
  idpost: number;
  card: any = {};
  package1List:IPackage1[];
  id: number;
  charity: ICharity;
  charityList:ICharity[];

  submitted=false;
  isShow=false
  isHide=false
  user:any = null;

  formCharity:FormGroup;
  formPackage1:FormGroup;
  currentTutorial = null;
  constructor(
    private package1Service:Package1Service,
    private nguoituthienService:NguoituthienService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public fb:FormBuilder,
    private donaterService: DonaterService,
    private tokenStorageService: TokenStorageService

    ) {  }

  ngOnInit() {
    // this.package1Service.getPackage1List().subscribe(ps => this.package1List = ps);
    // this.activatedRoute.queryParamMap.subscribe(
    //   query => {
    //     const orderBy = query.get('orderby');
    //     console.log(orderBy);
    //   });
    this.user = this.tokenStorageService.getUser();
    this.getTutorial(this.activatedRoute.snapshot.paramMap.get('idpost'));
    this.formCharity=this.fb.group({
      username: this.fb.control(''),
      card: this.fb.control('',[Validators.required]),
      cardNumber:this.fb.control('',[Validators.required,Validators.minLength(19)]),
      cardHolderName:this.fb.control('',[Validators.required]),
      expireDate:this.fb.control('',[Validators.required,Validators.minLength(5)]),
      securityCode: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      donate:this.fb.control('',[Validators.required]),
      idpost: this.fb.control(''),
      style: this.fb.control('')
    })
  }

  getTutorial(id) {
    console.log(id)
    this.package1Service.getById(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  selectDonate(donate: any)
  {
    this.formCharity.controls["donate"].setValue(donate);
  }
  changepttt(num: any)
  {
    this.isShow = true;
    if(num === 1)
      this.card = "visa";
    if(num === 2)
      this.card = "jcb";
    if(num === 3)
      this.card = "mastercard";
  }
  inputCardNumber(e)
  {
    var temp = "";
    var count = 1;
    var test = this.formCharity.value.cardNumber.split('-');
    test.forEach(el => {
      temp+=el;
      if(el.length % 4 === 0 && el.length != 0 && count != 4)
      {
        temp +="-";
        count++;
      }
    });

    this.formCharity.controls["cardNumber"].setValue(temp);
  }
  inputExpireDate()
  {
    var temp = "";
    var count = 1;
    var test = this.formCharity.value.expireDate.split('/');
    test.forEach(el => {
      temp+=el;
      if(el.length % 2 === 0 && el.length != 0 && count != 2)
      {
        temp +="/";
        count++;
      }
    });
    this.formCharity.controls["expireDate"].setValue(temp);
  }
  validate(date: any)
  {
    var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])$/;
    if (!(date_regex.test(date))) {
      return false;
    }
  }
  async submit(data: any)
  {   // kiểm tra raise == target thì stop
    if((this.currentTutorial.raised +  Number(this.formCharity.controls["donate"].value))  > this.currentTutorial.target)
    {
      return this.toastr.error("Vượt quá số tiền yêu cầu, không thể khuyên góp");
    }

    // Validate data here (tự kiểm tra dữ liệu nhập rồi hay chưa, cái đó dễ quá rồi)
     if(isNullOrUndefined(this.user))
     {
        this.toastr.error("Vui lòng đăng nhập để có thể sử dụng tính năng này !");
     }
    // Validate Ngày hết hạn của thẻ
    if(this.validate(data.controls.expireDate.value) == false || data.controls.expireDate.value == "30/02" || data.controls.expireDate.value == "31/02" )
    {
      // hiển thị dialog thông báo hay làm kiểu gì đó để cho ngta biết là ngày k hợp lệ ở đây
      // TODO ... //
      return;
    }
    // thêm thông tin donate
    this.currentTutorial.raised+= Number(this.formCharity.controls["donate"].value);
    this.formCharity.controls["idpost"].setValue(this.activatedRoute.snapshot.paramMap.get('idpost'));
    this.formCharity.controls["username"].setValue(this.user.email);
    this.formCharity.controls["style"].setValue("donate");

    await this.donaterService.addDonater(this.formCharity.value).toPromise().then(
      (data: any) => {
        if(data.errors != null)
        {
          this.toastr.error("Donate thất bại !");
          return;
        }
        this.toastr.success('Bạn đã donate thành công, chân thành cảm ơn bạn!')
        this.formCharity.reset()
      }
    );
    if((this.currentTutorial.raised +  Number(this.formCharity.controls["donate"].value))== this.currentTutorial.target)
    {
      this.currentTutorial.confirm = 'da xoa';
      this.currentTutorial.raised+= this.formCharity.controls["donate"].value;
      this.package1Service.updatePackage1(this.currentTutorial._id,this.currentTutorial).subscribe(
        (res)=>{
          this.getTutorial(this.activatedRoute.snapshot.paramMap.get('idpost'));
        },(error)=>{
          console.log(error)
        });
    }
    // update tiền trong bài post
    else{
    this.currentTutorial.raised+= this.formCharity.controls["donate"].value;
    this.package1Service.updatePackage1(this.currentTutorial._id,this.currentTutorial).subscribe(
      (res)=>{
        this.getTutorial(this.activatedRoute.snapshot.paramMap.get('idpost'));
      },(error)=>{
        console.log(error)
      });
    }
  }

}
