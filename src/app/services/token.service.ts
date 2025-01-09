import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { configFactories } from '../configFactories';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY:string='AuthToken';
const USERNAME_KEY:string='AuthUserName';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  idTimeMsg?:any;
  constructor(private router:Router,private cookieService:CookieService) { }

  public setToken(token:string):void{
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY,token);
  }

  public getToken(){
      return this.cookieService.get(TOKEN_KEY);
  }

  public setUserName(userName:string):void{
    this.cookieService.delete(USERNAME_KEY);
    this.cookieService.set(USERNAME_KEY,userName);
  }

  public getUserName(){
    return this.cookieService.get(USERNAME_KEY);
  }

  public logOut():void{
    this.cookieService.deleteAll();
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
