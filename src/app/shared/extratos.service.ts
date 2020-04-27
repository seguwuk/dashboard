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
    console.log(this.urlJson)
    return this.http.get(this.urlJson);
  }

  addData(data){
    console.log(this.urlJson)
    return this.http.post(this.urlJson, data);
  }

  addId(id,data){
    let urlId = `${environment.urlApi}/${id}.json`
    console.log(urlId)
    return this.http.patch(urlId, data);
  }

  excludeId(id){
    let urlExclusao = `${environment.urlApi}/${id}.json`
    console.log(urlExclusao)
    return this.http.delete(urlExclusao)
  }

}