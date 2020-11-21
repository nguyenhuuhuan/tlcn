export class IPackage2{
  id:number;
  title:string;
  target:number;
  raised:number;
  confirm:string;
  accuracy:string;
  description:string;
  createBy:string;
  createDate:Date;
  restaurant:{
    name:string;
    phoneNumber:number;
    address:string;
  }
  listPeople:([
    ({
      id:number;
      name:string;
      gender:string;
      phoneNumber:string;
      email:string;
      dob:Date;
      address:string;

    })
  ])
}
