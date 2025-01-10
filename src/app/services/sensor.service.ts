import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configFactories } from '../configFactories';
import { SensorDTO } from '../models/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

 constructor(private http:HttpClient) { }
 
   public getSensorsGroupByType(token:string): Observable<HttpResponse</* Map<string,SensorDTO> */any>>{
     return this.http.get<any>(configFactories.baseUrl+"/user/sensor",{
       observe:'response',
       headers: new HttpHeaders({ 
         'Authorization': `Bearer ${token}`})
     }).pipe();
   }

   public getAllSensorsFlat(token:string): Observable<HttpResponse<SensorDTO>>{
    return this.http.get<SensorDTO>(configFactories.baseUrl+"/user/sensorFlat",{
      observe:'response',
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${token}`})
    }).pipe();
  }
}
