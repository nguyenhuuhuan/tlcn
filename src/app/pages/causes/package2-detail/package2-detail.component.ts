import { IPackage2 } from 'src/app/service/package2';
import { NguoituthienService } from '../../../service/nguoituthien.service';
import { ICharity } from '../../../service/nguoituthien';
import { Package2Service } from '../../../service/package2.service';
import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, subscribeOn, switchMap } from 'rxjs/operators'
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'url';
import * as AOS from 'aos'
import { IComment } from 'src/app/service/comment';
import { CommentService } from 'src/app/service/comment.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { DonaterService } from 'src/app/service/donater.service';
declare var paypal;
@Component({
  selector: 'app-package2-detail',
  templateUrl: './package2-detail.component.html',
  styleUrls: ['./package2-detail.component.scss']
})
export class Package2DetailComponent implements OnInit {
  @Input() package2: IPackage2;
  //Paypal
  //@ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  commentList:IComment[]=[];
  commentForm:FormGroup;
  paidFor = false;
  donate: number;
  errorMessage = '';
  p:number=1

  package2List: IPackage2[];
  id: number;
  charity: ICharity;
  charityList: ICharity[];

  submitted = false;
  isShow = false
  isHide = false

  formCharity: FormGroup;
  formPackage2: FormGroup;
  tinhnguyenForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    sdt: new FormControl('',[Validators.required]),
    hovaten: new FormControl('',[Validators.required]),
    style: new FormControl('',[Validators.required]),
  })
  currentTutorial = null;

  _id: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard=false
  email: string;
  public const_data: any = {}
  constructor(
    private package2Service: Package2Service,
    private nguoituthienService: NguoituthienService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public fb: FormBuilder,
    public commentService:CommentService,
    public tokenStorage:TokenStorageService,
    public donaterService: DonaterService

  ) {
    activatedRoute.params.subscribe(params => { this._id = params['_id']; });

  }

  ngOnInit() {
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.email = user.email;
    }
    const user = this.tokenStorage.getUser();

    AOS.init()
    this.getTutorial(this.activatedRoute.snapshot.paramMap.get('id'));



      this.commentForm = this.fb.group({
        _id: ['', Validators.required],
        content: ['',Validators.required],
        createdDate: [Date.now],
        idUser: [this.tokenStorage.getUser().id,Validators.required],
        likes: [0],
        idPost:[ this.id],
        email:[user.email]
        // commentChild:[
        //   this.fb.group({
        //     idUserChild:[this.tokenStorage.getUser().id,Validators.required],
        //     createdDateChild:[Date.now],
        //     contentChild:['',Validators.required],
        //     likesChild:[0],
        //     emailChild:['',]
        //   })
        // ]
      })
  }
  getTransaction() {
    console.log(this.donate)
    this.currentTutorial.donate = this.donate
  }


  onSubmitComment() {
    this.commentService.addComment(this.commentForm.value).subscribe(
      data => {
        console.log(data);
        this.submitted=true
        this.toastr.success('New post created!')
        this.commentForm.controls['content'].reset()

        this.commentService.getByIdPost(this._id).subscribe(ps=>this.commentList=ps);

      },
      err => {
        this.errorMessage = err.error.message;

        this.toastr.warning(this.errorMessage,'Sign Up Failed!')

      }
    );
  }
  getTutorial(id) {
    this.package2Service.getById(id)
      .subscribe(
        data => {
          this.currentTutorial = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  donateP()
  {
    this.router.navigate(['donate',this.id]);
  }
  DK()
  {
    const user = this.tokenStorage.getUser();
      this.const_data.style="tinhnguyen";
      this.const_data.username = user.email;
      this.const_data.hovaten = this.tinhnguyenForm.value.hovaten;
      this.const_data.sdt = this.tinhnguyenForm.value.sdt;
      this.const_data.idpost = this.id;
      this.donaterService.addDonater(this.const_data).toPromise().then(
        (data: any) => {
          if(data.errors != null)
          {
            this.toastr.error("Đăng ký thất bại !");
            return;
          }
          this.toastr.success('Bạn đã đăng ký thành công, chân thành cảm ơn bạn!')
          this.formCharity.reset()
        }
      );
  }
}
