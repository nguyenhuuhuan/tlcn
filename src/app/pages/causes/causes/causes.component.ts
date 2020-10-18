import { CausesService } from './../../../service/causes.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ICauses} from '../../../service/causes'
import { query } from '@angular/animations';
@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {
  causeList:ICauses[];
  public isShow:boolean=false
  public goi:String='Person'
  constructor(
    private CausesService:CausesService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    this.CausesService.getCausesList().subscribe(ps=>this.causeList=ps);
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        const orderBy=query.get('orderby');
        console.log(orderBy);
      }
    )
   // this.refeshCausesList()
  }
  // refeshCausesList(){
  //   this.CausesService.getCausesList().subscribe((res)=>{
  //     this.CausesService.causeList=res.res
  //   })
  // }
  onToggle=()=>{
    this.isShow=!this.isShow
  }

}
