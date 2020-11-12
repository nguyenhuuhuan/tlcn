export interface IUser{
    id:string,
    fullName:string,
    userName:string,
    passwords:[{
      password:string,
      confirmPassword:string
    }],
    email:string,
    address:string,
    phoneNumber:string,
  }
  