import { Package1Service } from '../../../service/package1.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { IPackage1 } from '../../../service/package1'
import { query } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {
  package1List:IPackage1[]=[];
  public isShow:boolean=false
  public goi:String='Person'
  submitted=false;
  package1Form:FormGroup;
  p:number=1
  title:any;
  constructor(
    private package1Service:Package1Service,
    private activatedRoute:ActivatedRoute,

    ) { }

  ngOnInit() {
    this.package1Service.getPackage1List().subscribe(ps=>this.package1List=ps);
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        const orderBy=query.get('orderby');
        console.log(orderBy);
      }
    )
  }
  Search(){
    if(this.title===""){
      this.ngOnInit();
    }else{
      this.package1List=this.package1List.filter(res=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
      })
    }
  }
  onToggle=()=>{
    this.isShow=!this.isShow
  }

}
