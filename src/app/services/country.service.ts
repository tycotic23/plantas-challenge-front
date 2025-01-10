import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs';
import { configFactories } from '../configFactories';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }
  
    public getAllCountries(): Observable<HttpResponse<Country[]>>{
        return this.http.get<Country[]>("https://restcountries.com/v3.1/all?fields=name,flags",{
          observe:'response'
        }).pipe();
      }
}
