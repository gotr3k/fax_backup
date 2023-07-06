import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { SubjectStudentList } from 'src/models/subjectStudentList.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectStudentListService {

  uri = 'http://localhost:8080/api/slusanja';

  constructor(private http: HttpClient) { }

  create(studentUsername:string, subjectId:number){
      var data={
        studentUsername:studentUsername,
          subjectId:subjectId,
      }
      return this.http.post<SubjectStudentList>(`${this.uri}`,data);
  }
  
  getAllStudentsOfSubject(subjectId:number){
      var data={
          subjectId:subjectId
      }
      return this.http.post<SubjectStudentList[]>(`${this.uri}/predmet`,data);
  }

  getAllSubjectsOfStudent(studentUsername:string){
    var data={
        studentUsername:studentUsername
    }
    return this.http.post<SubjectStudentList[]>(`${this.uri}/student`,data);
  }
  
  deleteSubjectStudent(subjectId:number, studentUsername:string){
    return this.http.delete(`${this.uri}/predmetStudent/${subjectId}/${studentUsername}`);
  }

  deleteBySubject(subjectId:number){
    return this.http.delete(`${this.uri}/predmet/${subjectId}`);
  }
  
  deleteByStudent(studentUsername:string){
    return this.http.delete(`${this.uri}/student/${studentUsername}`);
  }
  
  deleteAll(){
    return this.http.delete(`${this.uri}`);
  }
}