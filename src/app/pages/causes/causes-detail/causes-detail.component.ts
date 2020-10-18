import { CausesService } from './../../../service/causes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators'
import {ICauses} from '../../../service/causes'
@Component({
  selector: 'app-causes-detail',
  templateUrl: './causes-detail.component.html',
  styleUrls: ['./causes-detail.component.css']
})
export class CausesDetailComponent implements OnInit {
  cause:ICauses;
  constructor(
    private causesService:CausesService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map(params=>params.get('id')),
      switchMap(id=>this.causesService.getById(id))
    ).subscribe(cause=>this.cause=cause);
  }


}