import { CausesService } from './../../../service/causes.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { ICauses } from '../../../service/causes'
import { query } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.css']
})
export class CausesComponent implements OnInit {
  causeList:ICauses[];
  public isShow:boolean=false
  public goi:String='Person'
  submitted=false;
  causeForm:FormGroup;

  constructor(
    private CausesService:CausesService,
    private activatedRoute:ActivatedRoute,
    
    ) { }

  ngOnInit() {
    this.CausesService.getCausesList().subscribe(ps=>this.causeList=ps);
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        const orderBy=query.get('orderby');
        console.log(orderBy);
      }
    )
  }
  
  onToggle=()=>{
    this.isShow=!this.isShow
  }

}
