import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExtratosService {


  urlGet = environment.urlApi;


  constructor(private http: HttpClient) { }

  getData(){
    console.log(this.urlGet)
    return this.http.get(this.urlGet);
  }


}