export interface User{
    id:number;
    name:string;
    password:string;
    avatar:string;
    email:string;
}

export interface UserLogin{
    email:string;
    password:string;
}