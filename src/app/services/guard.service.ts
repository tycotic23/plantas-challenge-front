
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
constructor(private tokenService:TokenService,private router:Router){}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    if(!this.tokenService.getToken()){
      this.router.navigate(route.data['denied']);
      return false;
    }
    return true;
  }
  
}
