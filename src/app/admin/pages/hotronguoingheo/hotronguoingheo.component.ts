import { CausesService } from './../../../service/causes.service';
import { Component, OnInit } from '@angular/core';
import { ICauses } from 'src/app/service/causes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotronguoingheo',
  templateUrl: './hotronguoingheo.component.html',
  styleUrls: ['./hotronguoingheo.component.css']
})
export class HotronguoingheoComponent implements OnInit {
  causeList:ICauses[];

  constructor(
    private causesService:CausesService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    this.causesService.getCausesList().subscribe(ps=>this.causeList=ps);
    // this.activatedRoute.queryParamMap.subscribe(
    //   query=>{
    //     const orderBy=query.get('orderby');
    //     console.log(orderBy);
    //   }
  }

}
