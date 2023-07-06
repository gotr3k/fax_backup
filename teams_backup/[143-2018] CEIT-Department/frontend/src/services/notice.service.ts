import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Notice } from 'src/models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  uri = 'http://localhost:8080/api/obavestenja';

  constructor(private http: HttpClient) { }

  create(title:string, category:number, notice:string, date:Date){
    var data={
      title:title,
      category:category,
      notice:notice,
      date:date
    }
    return this.http.post<Notice>(`${this.uri}`, data);
  }

  getAll(){
      return this.http.get<Notice[]>(`${this.uri}`);
  }

  getAll1(){
    return this.http.get<Notice[]>(`${this.uri}/?category=1`);
  }

  getAll2(){
    return this.http.get<Notice[]>(`${this.uri}/?category=2`);
  }

  getAll3(){
    return this.http.get<Notice[]>(`${this.uri}/?category=3`);
  }

  getAll4(){
    return this.http.get<Notice[]>(`${this.uri}/?category=4`);
  }

  getAllPast3Months(){
      return this.http.get<Notice[]>(`${this.uri}/3meseca`);
  }

  getAllPast3Months1(){
    return this.http.get<Notice[]>(`${this.uri}/3meseca/?category=1`);
  }

  getAllPast3Months2(){
    return this.http.get<Notice[]>(`${this.uri}/3meseca/?category=2`);
  }

  getAllPast3Months3(){
    return this.http.get<Notice[]>(`${this.uri}/3meseca/?category=3`);
  }

  getAllPast3Months4(){
    return this.http.get<Notice[]>(`${this.uri}/3meseca/?category=4`);
  }
  
  getNotice(title:string, category:number, date:Date){
      var data={
          title:title,
          category:category,
          date:date
      }
      return this.http.post<Notice>(`${this.uri}/jedno`,data);
  }

  update(id:number, title:string, category:number, date:Date, notice:string){
    var data={
        id:id,
        title:title,
        category:category,
        date:date,
        notice:notice
    }
    return this.http.put<Notice>(`${this.uri}`, data);
  }

  deleteNotice(id:number){
      return this.http.delete(`${this.uri}/${id}`);
  }

  deleteAllNotices(){
      return this.http.delete(`${this.uri}`);
  }
}