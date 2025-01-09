import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { configFactories } from '../configFactories';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(loginUser:UserLogin): Observable<HttpResponse<any>>{
    return this.http.post<any>(configFactories.baseUrl+"/user/login",loginUser,{
      observe:'response',
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'})
    }).pipe();
  }

  /* public login(loginUser:UserLogin): Observable<string>{
    return this.http.get<string>(configFactories.baseUrl+"/user/checkLogin").pipe();
  } */
}
