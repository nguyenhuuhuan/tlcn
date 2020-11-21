import { AuthService } from './../../auth.service';
import { Package1Service } from '../../service/package1.service';
import { IPackage1 } from '../../service/package1';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap,map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  package1List:IPackage1[];
  constructor(
    private package1Service:Package1Service,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService
  ) {
  }

  ngOnInit() {
    // this.activatedRoute.paramMap.pipe(
    //   map(params=>params.get(1)),
    //   switchMap(id=>this.causesService.getById(id)
    // ).subscribe(cause=>this.cause=cause)
    this.getCauses()
  }
  login(){
    this.authService.login()
  }
  logout(){
    this.authService.logout()
  }
  getCauses():void{
    this.package1Service.getPackage1List().subscribe(package1List=> this.package1List =package1List.slice(1,2))
  }
}
