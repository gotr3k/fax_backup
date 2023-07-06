import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { List } from 'src/models/list.model';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  uri = 'http://localhost:8080/api/lists';

  constructor(private http: HttpClient) { }

  create(name:string, date:Date, time:string, subjectId:number, place:string, slots:any, open:boolean=true){
    var data={
        name:name,
        date:date,
        time:time,
        subjectId:subjectId,
        place:place,
        slots:slots,
        open:open
    }
    return this.http.post<List>(`${this.uri}`, data);
  }

  getAll(){
      return this.http.get<List[]>(`${this.uri}`);
  }

  getAllBySubject(subjectId:number){
      var data={
          subjectId:subjectId
      }
    return this.http.post<List[]>(`${this.uri}BySubject`,data);
  }

  getOpenBySubject(subjectId:number){
    var data={
        subjectId:subjectId
    }
    return this.http.post<List[]>(`${this.uri}OpenBySubject`,data);
  }

  update(id:number, name:string, date:Date, time:string, subjectId:number, place:string, slots:any, open:boolean){
    var data={
        id:id,
        name:name,
        date:date,
        time:time,
        subjectId:subjectId,
        place:place,
        slots:slots,
        open:open
    }
    return this.http.put<List>(`${this.uri}`, data);
  }

  deleteList(id:number){
      return this.http.delete(`${this.uri}/${id}`);
  }

  deleteAllLists(){
      return this.http.delete(`${this.uri}`);
  }
}