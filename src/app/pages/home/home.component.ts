import { AuthService } from './../../auth.service';
import { CausesService } from './../../service/causes.service';
import { ICauses } from './../../service/causes';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap,map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cause:ICauses;
  constructor(
    private causesService:CausesService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params=>params.get('1')),
      switchMap(id=>this.causesService.getById(id))
    ).subscribe(cause=>this.cause=cause)
  }
  login(){
    this.authService.login()
  }
  logout(){
    this.authService.logout()
  }

}
