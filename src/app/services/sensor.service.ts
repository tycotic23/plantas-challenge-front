import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configFactories } from '../configFactories';
import { SensorDTO, SensorUpdate } from '../models/sensor';

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

  public createSensor(token:string,sensor:SensorUpdate): Observable<HttpResponse<SensorDTO>>{
    return this.http.post<SensorDTO>(configFactories.baseUrl+"/sensor",sensor,{
      observe:'response',
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${token}`})
    }).pipe();
  }

  public disableSensor(token:string,factory_id:number,type:string): Observable<HttpResponse<SensorDTO>>{
    return this.http.patch<SensorDTO>(configFactories.baseUrl+"/sensor/disable",{factory_id:factory_id,type:type},{
      observe:'response',
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${token}`})
    }).pipe();
  }

  public enableSensor(token:string,factory_id:number,type:string): Observable<HttpResponse<SensorDTO>>{
    return this.http.patch<SensorDTO>(configFactories.baseUrl+"/sensor/enable",{factory_id:factory_id,type:type},{
      observe:'response',
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${token}`})
    }).pipe();
  }
}
