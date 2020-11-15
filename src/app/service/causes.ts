import { Data } from '@angular/router';

export class ICauses{
  id:number;
  title:string;
  imageUrl:string;
  target:number;
  raised:number;
  confirm:string;
  accuracy:string;
  description:string;
  person:{
    id:number;
    firstName:string;
    lastName:string;
    dob:Date;
    address:string;
    avatarUrl:string;
  }
}
