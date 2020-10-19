export interface ICauses{
  id:number,
  title:string,
  imageUrl:string,
  target:Number,
  raised:Number,
  description:string,
  person:[{
    id:string,
    name:string,
    dob:string,
    adress:string
  }]
}
