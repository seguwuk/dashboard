import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExtratosService {


  urlJson = `${environment.urlApi}.json` ;


  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.urlJson);
  }

  addData(data){
    return this.http.post(this.urlJson, data);
  }

  addId(id,data){
    let urlId = `${environment.urlApi}/${id}.json`
    return this.http.patch(urlId, data);
  }

  excludeId(id){
    let urlExclusao = `${environment.urlApi}/${id}.json`
    return this.http.delete(urlExclusao)
  }

}