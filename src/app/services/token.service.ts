import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { configFactories } from '../configFactories';

const TOKEN_KEY:string='AuthToken';
const USERNAME_KEY:string='AuthUserName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  idTimeMsg?:any;
  constructor(private router:Router) { }

  public setToken(token:string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(){
      return localStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName:string):void{
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY,userName);
  }

  public getUserName(){
    return window.localStorage.getItem(USERNAME_KEY);
  }

  public logOut():void{
    window.localStorage.clear();
    this.destroyAutoLogout();
    this.router.navigate(['/login']);
  }

  public autoLogout(){
    this.idTimeMsg=setTimeout(()=>{
      this.logOut();
    },configFactories.expireToken*1000);
  }

  public destroyAutoLogout(){
    if(this.idTimeMsg){
      clearTimeout(this.idTimeMsg);
    }
  }
}
