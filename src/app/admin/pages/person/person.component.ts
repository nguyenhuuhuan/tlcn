import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../service/person.service';
import { IPerson } from '../../service/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person:IPerson[];
  constructor(
    private personService:PersonService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.personService.getPoorPeopleList().subscribe(ps=>this.person=ps);
    this.activatedRoute.queryParamMap.subscribe(
      query=>{
        const orderBy=query.get('orderby');
        console.log(orderBy);
      }
    )
  }

}
