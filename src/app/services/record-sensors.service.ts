import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { configFactories } from '../configFactories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordSensorsService {

  constructor(private http:HttpClient) { }
  
    public getAllRecordSensors(token:string): Observable<HttpResponse<Record[]>>{
          return this.http.get<Record[]>(configFactories.baseUrl+"/recordSensor",{
            observe:'response',
            headers: new HttpHeaders({ 
              'Authorization': `Bearer ${token}`})
          }).pipe();
      }
}
