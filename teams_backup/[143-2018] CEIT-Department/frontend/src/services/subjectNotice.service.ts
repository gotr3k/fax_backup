import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { SubjectNotice } from 'src/models/subjectNotice.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectNoticeService {

  uri = 'http://localhost:8080/api/predmetnaObavestenja';

  constructor(private http: HttpClient) { }

  create(title:string, subjectCode:string, notice:string, date:Date){
    var data={
      title:title,
      subjectCode:subjectCode,
      notice:notice,
      date:date
    }
    return this.http.post<SubjectNotice>(`${this.uri}`, data);
  }

  getAll(){
      return this.http.get<SubjectNotice[]>(`${this.uri}`);
  }

  getAllSubject(subjectCode:string){
    return this.http.get<SubjectNotice[]>(`${this.uri}/?subjectCode=${subjectCode}`);
  }

  getAllPast7Days(){
      return this.http.get<SubjectNotice[]>(`${this.uri}/7dana`);
  }

  getAllPast7DaysSubject(subjectCode:string){
    return this.http.get<SubjectNotice[]>(`${this.uri}/7dana/?subjectCode=${subjectCode}`);
  }
  
  getSubjectNotice(title:string, subjectCode:string, date:Date){
      var data={
          title:title,
          subjectCode:subjectCode,
          date:date
      }
      return this.http.post<SubjectNotice>(`${this.uri}/jedno`,data);
  }

  update(id:number, title:string, subjectCode:string, date:Date, notice:string){
    var data={
        id:id,
        title:title,
        subjectCode:subjectCode,
        date:date,
        notice:notice
    }
    return this.http.put<SubjectNotice>(`${this.uri}`, data);
  }

  deleteNotice(id:number){
      return this.http.delete(`${this.uri}/${id}`);
  }

  deleteAllNotices(){
      return this.http.delete(`${this.uri}`);
  }
}