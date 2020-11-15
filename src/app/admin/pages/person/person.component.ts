import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CausesService } from 'src/app/service/causes.service';
import { ICauses } from 'src/app/service/causes';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  causeList:ICauses[];
  constructor(
    private causeService:CausesService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.causeService.getCausesList().subscribe(ps=>this.causeList=ps);
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        const orderBy=query.get('orderby');
        console.log(orderBy);
      }
    )
  }

}
