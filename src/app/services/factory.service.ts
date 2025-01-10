import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryCreate, FactoryInfoDTO } from '../models/factory';
import { configFactories } from '../configFactories';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(private http:HttpClient) { }

  public getAllFactories(token:string): Observable<HttpResponse<FactoryInfoDTO[]>>{
      return this.http.get<FactoryInfoDTO[]>(configFactories.baseUrl+"/factory",{
        observe:'response',
        headers: new HttpHeaders({ 
          'Authorization': `Bearer ${token}`})
      }).pipe();
  }

  public createFactory(factory:FactoryCreate,token:string): Observable<HttpResponse<FactoryInfoDTO>>{
    return this.http.post<FactoryInfoDTO>(configFactories.baseUrl+"/factory",factory,{
      observe:'response',
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${token}`})
    }).pipe();
  }
}
