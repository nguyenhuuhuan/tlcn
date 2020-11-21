import { Data } from '@angular/router';

export class IPackage1{
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
    gender:string
    dob:Date;
    address:string;
    avatarUrl:string;
  }
  createdBy:string;
  createdDate:Date
}
