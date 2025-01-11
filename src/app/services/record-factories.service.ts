import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { Observable } from 'rxjs';
import { configFactories } from '../configFactories';

@Injectable({
  providedIn: 'root'
})
export class RecordFactoriesService {

  constructor(private http:HttpClient) { }

  public getAllRecordFactories(token:string): Observable<HttpResponse<Record[]>>{
        return this.http.get<Record[]>(configFactories.baseUrl+"/recordFactory",{
          observe:'response',
          headers: new HttpHeaders({ 
            'Authorization': `Bearer ${token}`})
        }).pipe();
    }
}
