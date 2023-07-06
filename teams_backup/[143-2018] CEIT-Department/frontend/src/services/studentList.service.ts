import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { StudentList } from 'src/models/studentList.model';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  uri = 'http://localhost:8080/api/prijave';

  constructor(private http: HttpClient) { }

  create(studentUsername:string, listId:number){
    var data={
      studentUsername:studentUsername,
      listId:listId
    }
    return this.http.post<StudentList>(`${this.uri}`, data);
  }

  getAll(){
      return this.http.get<StudentList[]>(`${this.uri}`);
  }

  getAllByList(listId:number){
      var data={
          listId:listId
      }
    return this.http.post<StudentList[]>(`${this.uri}ByList`,data);
  }

  getAllByStudent(studentUsername:string){
    var data={
        studentUsername:studentUsername
    }
    return this.http.post<StudentList[]>(`${this.uri}ByStudent`,data);
  }

  deleteByStudentList(studentUsername:string,listId:number){
      return this.http.delete(`${this.uri}/${listId}/${studentUsername}`);
  }

  deleteByStudent(studentUsername:string){
    return this.http.delete(`${this.uri}ByStudent/${studentUsername}`);
  }

  deleteByList(listId:number){
    return this.http.delete(`${this.uri}ByList/${listId}`);
  }

  deleteAll(){
      return this.http.delete(`${this.uri}`);
  }
}