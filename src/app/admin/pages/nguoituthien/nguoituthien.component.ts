import { Component, OnInit } from '@angular/core';
import { ICharity } from '../../../service/nguoituthien';
import { NguoituthienService } from '../../../service/nguoituthien.service';

@Component({
  selector: 'app-nguoituthien',
  templateUrl: './nguoituthien.component.html',
  styleUrls: ['./nguoituthien.component.css']
})
export class NguoituthienComponent implements OnInit {
  charityList:ICharity[]
  p:number=1
  constructor(
    private charityService:NguoituthienService,
  ) { }

  ngOnInit() {
    this.charityService.getCharityList().subscribe(ps=>this.charityList=ps)
  }

}
